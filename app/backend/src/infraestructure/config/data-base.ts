import { DataSource } from "typeorm";
import dotenv from "dotenv";
import envs from "./environment-vars";
import { User } from "../entities/User";
import { ActivityEntity } from "../entities/ActivityEntity";
import { EvidenceEntity } from "../entities/EvidenceEntity";
import { IAValidationEntity } from "../entities/IAValidationEntity";
import { CatalogoActividad } from "../entities/CatalogoActividad";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    schema: "public",
    synchronize: true, 
    logging: true,
    entities: [
        User,
        ActivityEntity,
        EvidenceEntity,
        IAValidationEntity,
        CatalogoActividad
    ]
});

// conectar a la BD
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conectado a la base de datos PostgresSQL");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
};
