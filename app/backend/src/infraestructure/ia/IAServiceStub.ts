// src/infrastructure/ia/IAServiceStub.ts
import { IAService } from "./IAService";
import { IAResult } from "../../domain/IAResult";

export class IAServiceStub implements IAService {
  async analyzeImage(urlOrPath: string): Promise<IAResult> {
    return {
      valid: true,
      confidence: 0.86,
      labels: ["plastic", "bottle"],
      fraudDetected: false,
      score: 10,
      message: "Imagen coherente con reciclaje: plástico detectado"
    };
  }

  async analyzeVideo(urlOrPath: string): Promise<IAResult> {
    return {
      valid: true,
      confidence: 0.78,
      labels: ["people", "collecting"],
      fraudDetected: false,
      score: 12,
      message: "Video válido."
    };
  }

  async analyzeGPS(gps: { lat: number; lng: number }): Promise<IAResult> {
    return {
      valid: true,
      confidence: 0.9,
      labels: ["location_ok"],
      fraudDetected: false,
      score: 5,
      message: "Coordenadas coinciden con zona de actividad."
    };
  }

  async analyzeText(text: string): Promise<IAResult> {
    return {
      valid: true,
      confidence: 0.6,
      labels: ["description_ok"],
      fraudDetected: false,
      score: 2,
      message: "Texto explicativo válido."
    };
  }
}
