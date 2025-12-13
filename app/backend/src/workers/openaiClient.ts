// src/workers/openaiClient.ts
import fs from "fs";
import OpenAI from "openai";
import { IAResult } from "../domain/IAResult";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function safeExtractTextFromResponse(res: any): string {
  // 1) Primer intento: propiedad convenience
  if (res?.output_text && typeof res.output_text === "string") {
    return res.output_text;
  }

  // 2) Segundo intento: intentar extraer texto desde res.output (array)
  const out = res?.output;
  if (Array.isArray(out)) {
    // varios formatos posibles; intentamos extraer cualquier texto legible
    const texts: string[] = [];

    for (const item of out) {
      // formato simple: item.type / item.text
      if (typeof item === "string") {
        texts.push(item);
        continue;
      }

      // item.content puede ser un array con objetos de distinto tipo
      if (Array.isArray(item?.content)) {
        for (const c of item.content) {
          if (typeof c === "string") {
            texts.push(c);
          } else if (typeof c?.text === "string") {
            texts.push(c.text);
          } else if (Array.isArray(c?.parts)) {
            // new SDK: parts -> {type:'text', text: '...'} or {type:'image'}
            for (const p of c.parts) {
              if (p?.type === "text" && typeof p?.text === "string") {
                texts.push(p.text);
              }
            }
          } else if (typeof c?.payload === "string") {
            texts.push(c.payload);
          }
        }
        continue;
      }

      // new SDK: item?.message?.content or item?.message?.content?.[0]?.text
      if (Array.isArray(item?.message?.content)) {
        for (const mc of item.message.content) {
          if (typeof mc?.text === "string") texts.push(mc.text);
          else if (typeof mc === "string") texts.push(mc);
        }
        continue;
      }

      // fallback a propiedades conocidas
      if (typeof item?.text === "string") texts.push(item.text);
      if (typeof item?.message === "string") texts.push(item.message);
      if (typeof item?.body === "string") texts.push(item.body);
    }

    if (texts.length) return texts.join("\n\n");
  }

  // 3) como último recurso, intentar stringify del objeto de salida
  try {
    return JSON.stringify(res, null, 2);
  } catch {
    return "{}";
  }
}

export async function callOpenAIVision(localPath: string): Promise<IAResult> {
  const prompt = `
Analiza la imagen y devuélveme un JSON con la siguiente estructura EXACTA:

{
  "valid": boolean,
  "materials": string[],
  "confidence": number,
  "fraud": boolean,
  "score": number,
  "message": string
}

Reglas:
- "materials" debe contener materiales reciclables detectados: "plastic", "glass", "metal", "paper", "cardboard", "organic".
- "confidence" entre 0 y 1.
- "valid" = true si se detecta al menos un material reciclable.
- "fraud" = true si la imagen es borrosa, repetida, descargada de internet o no coincide con reciclaje.
- "score": da 10 puntos si es reciclaje correcto, 0 si no.
- Responde SOLO el JSON, sin texto adicional.
`;

  try {
    const imageStream = fs.createReadStream(localPath);

    const res = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          // usamos "parts" si tu SDK/plan lo soporta, sino "content" ya no es fiable
          parts: [
            { type: "text", text: prompt },
            { type: "image", image: imageStream }
          ]
        }
      ]
    } as any);

    // extraemos el texto de forma segura
    const raw = safeExtractTextFromResponse(res as any);
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // si no es JSON, intentar buscar un JSON dentro del texto
      const maybeJsonMatch = raw.match(/\{[\s\S]*\}/);
      if (maybeJsonMatch) {
        try {
          parsed = JSON.parse(maybeJsonMatch[0]);
        } catch {
          parsed = null;
        }
      } else {
        parsed = null;
      }
    }

    if (!parsed || typeof parsed !== "object") {
      return {
        valid: false,
        confidence: 0,
        labels: [],
        fraudDetected: false,
        score: 0,
        message: "No se obtuvo JSON válido de la IA"
      };
    }

    return {
      valid: parsed.valid ?? false,
      confidence: parsed.confidence ?? 0,
      labels: (parsed.materials ?? parsed.labels ?? []) as string[],
      fraudDetected: parsed.fraud ?? false,
      score: parsed.score ?? 0,
      message: parsed.message ?? ""
    };
  } catch (err) {
    console.error("callOpenAIVision error:", err);
    return {
      valid: false,
      confidence: 0,
      labels: [],
      fraudDetected: false,
      score: 0,
      message: "Error al contactar OpenAI"
    };
  }
}
