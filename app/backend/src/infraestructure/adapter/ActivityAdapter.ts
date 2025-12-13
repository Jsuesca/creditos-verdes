import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-base";

import { Activity } from "../../domain/Activity";
import { Evidence } from "../../domain/Evidence";
import { IAResult } from "../../domain/IAResult";

import { ActivityEntity } from "../entities/ActivityEntity";
import { EvidenceEntity } from "../entities/EvidenceEntity";
import { IAValidationEntity } from "../entities/IAValidationEntity";

import { ActivityPort } from "../../domain/ActivityPort";

export class ActivityAdapter implements ActivityPort {
  private actRepo: Repository<ActivityEntity>;
  private evRepo: Repository<EvidenceEntity>;
  private iaRepo: Repository<IAValidationEntity>;

  constructor() {
    this.actRepo = AppDataSource.getRepository(ActivityEntity);
    this.evRepo = AppDataSource.getRepository(EvidenceEntity);
    this.iaRepo = AppDataSource.getRepository(IAValidationEntity);
  }

  // -------------------------------------------------
  // MAPPERS → Domain
  // -------------------------------------------------

  private toDomainActivity(a: ActivityEntity): Activity {
    return {
      id: a.id,
      title: a.title,
      description: a.description ?? null,
      checklist: a.checklist ?? null,
      basePoints: a.base_points,
      deadline: a.deadline ?? null,
      level: a.level as Activity["level"],
      createdBy: a.created_by,
      active: a.active,
      createdAt: a.created_at,
    };
  }

  private toDomainEvidence(e: EvidenceEntity): Evidence {
    return {
      id: e.id,
      activityId: e.activity_id,
      userId: e.user_id,
      type: e.type as Evidence["type"],
      url: e.url ?? null,
      gps: e.gps ?? null,
      text: e.text ?? null,
      status: e.status as Evidence["status"],
      createdAt: e.created_at,
      pointsAwarded: e.points_awarded ?? null,
      iaValidationId: e.ia_validation_id ?? null,
    };
  }

  // -------------------------------------------------
  // METHODS
  // -------------------------------------------------

  async createActivity(activity: Omit<Activity, "id" | "createdAt">): Promise<number> {
    const ent = this.actRepo.create({
      title: activity.title,
      description: activity.description ?? null,
      checklist: activity.checklist ?? null,
      base_points: activity.basePoints,
      deadline: activity.deadline ?? null,
      level: activity.level,
      created_by: activity.createdBy,
      active: activity.active,
    });

    const saved = await this.actRepo.save(ent);
    return saved.id;
  }

  async getActivityById(id: number): Promise<Activity | null> {
    const entity = await this.actRepo.findOne({ where: { id } });
    return entity ? this.toDomainActivity(entity) : null;
  }

  async listActivities(activeOnly = true): Promise<Activity[]> {
    const list = activeOnly
      ? await this.actRepo.find({ where: { active: true } })
      : await this.actRepo.find();

    return list.map((a) => this.toDomainActivity(a));
  }

  async createEvidence(evidence: Omit<Evidence, "id" | "createdAt" | "status">): Promise<number> {
    const ent = this.evRepo.create({
      activity_id: evidence.activityId,
      user_id: evidence.userId,
      type: evidence.type,
      url: evidence.url ?? null,
      gps: evidence.gps ?? null,
      text: evidence.text ?? null,
      status: "pending",
    });

    const saved = await this.evRepo.save(ent);
    return saved.id;
  }

  async listEvidenceByActivity(activityId: number): Promise<Evidence[]> {
    const list = await this.evRepo.find({ where: { activity_id: activityId } });
    return list.map((e) => this.toDomainEvidence(e));
  }

  async listEvidenceByUser(userId: number): Promise<Evidence[]> {
    const list = await this.evRepo.find({ where: { user_id: userId } });
    return list.map((e) => this.toDomainEvidence(e));
  }

  async updateEvidenceStatus(
    evidenceId: number,
    status: Evidence["status"],
    points?: number,
    iaValidationId?: number
  ): Promise<boolean> {
    const e = await this.evRepo.findOne({ where: { id: evidenceId } });
    if (!e) return false;

    e.status = status;
    if (points !== undefined) e.points_awarded = points;
    if (iaValidationId !== undefined) e.ia_validation_id = iaValidationId;

    await this.evRepo.save(e);
    return true;
  }

  async saveIAResult(evidenceId: number, result: IAResult): Promise<number> {
    const ent = this.iaRepo.create({
      evidence_id: evidenceId,
      result,
    });

    const saved = await this.iaRepo.save(ent);
    return saved.id;
  }

  async getIAResult(id: number): Promise<IAResult | null> {
    const r = await this.iaRepo.findOne({ where: { id } });
    return r ? (r.result as IAResult) : null;
  }
}
