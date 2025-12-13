import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import fs from "fs";
import path from "path";
import axios from "axios";
import { AppDataSource } from "../infraestructure/config/data-base";
import { IAValidationEntity } from "../infraestructure/entities/IAValidationEntity";
import { ActivityAdapter } from "../infraestructure/adapter/ActivityAdapter";
import imageHash from "imghash";
import { callOpenAIVision } from "./openaiClient";


const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

const worker = new Worker(
  "evidence-queue",
  async (job: Job) => {
    const { evidenceId, url, type, userId } = job.data as any;

    await AppDataSource.initialize().catch(() => {});

    // TMP dir
    const tmpDir = path.join(__dirname, "..", "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const localPath = path.join(
      tmpDir,
      `${evidenceId}_${path.basename(url)}`
    );

    // Download file
    const writer = fs.createWriteStream(localPath);
    const response = await axios.get(url, { responseType: "stream" });
    response.data.pipe(writer);

    await new Promise<void>((resolve, reject) =>
      writer.on("finish", () => resolve()).on("error", reject)
    );

    // PHASH
    let phash = "";
    try {
      phash = await imageHash.hash(localPath, 16, "hex");
    } catch (e) {
      console.warn("phash error", e);
    }

    // IA OpenAI
    let openaiResult: any;
    try {
      openaiResult = await callOpenAIVision(localPath);
    } catch (err) {
      console.error("openai error", err);
      openaiResult = {
        valid: false,
        confidence: 0,
        labels: [],
        fraudDetected: false,
        score: 0,
        message: "IA error"
      };
    }

    // Fraude simple
    const fraudDetected = false;

    const iaResult = {
      valid: openaiResult.valid && !fraudDetected,
      confidence: openaiResult.confidence,
      labels: openaiResult.labels,
      fraudDetected,
      score: openaiResult.score,
      message: openaiResult.message
    };

    // Save IA result
    const iaRepo = AppDataSource.getRepository(IAValidationEntity);
    const saved = await iaRepo.save({
      evidence_id: evidenceId,
      result: iaResult
    } as any);

    // Update evidence
    const adapter = new ActivityAdapter();
    const status =
      iaResult.valid && !fraudDetected ? "accepted" : "rejected";
    const points =
      iaResult.valid && !fraudDetected
        ? Math.max(0, Math.round(iaResult.score))
        : 0;

    await adapter.updateEvidenceStatus(
      evidenceId,
      status as any,
      points,
      saved.id
    );

    // Cleanup
    try {
      fs.unlinkSync(localPath);
    } catch {}

    return { iaId: saved.id };
  },
  { connection }
);

// Logs
worker.on("completed", (job) =>
  console.log("job completed", job.id)
);
worker.on("failed", (job, err) =>
  console.error("job failed", job?.id, err)
);
