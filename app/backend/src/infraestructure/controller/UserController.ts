import { UserApplication } from "../../application/UserApplication";
import { Request, Response } from "express";
import { loadUserData } from "../util/user-validation";
import { User } from "../../domain/User";
import { loadEmail } from "../util/email-validation";
import { loadUpdateUserData } from "../util/user-update-validation";


export class UserController {

    private app: UserApplication;

    constructor(application: UserApplication) {
        this.app = application;
    }

    async login(req: Request, res: Response): Promise<string | Response> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "Email y contraseña requeridos"
                });
            }

            const token = await this.app.login(email, password);
            return res.status(200).json({ message: "Login Exitoso", token })
        } catch (error) {
            return res.status(401).json({ error: "Credenciales Invalidas" });
        }
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            // Validar los datos de entrada
            const { name, email, password, status } = loadUserData(req.body);

            // Crear usuario
            const user: Omit<User, "id"> = { name, email, password, status };
            const userId = await this.app.createUser(user);

            return res
                .status(201)
                .json({ message: "Usuario creado con éxito", userId });

        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }

            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const dataload = loadUpdateUserData(req.body);
            const updated = await this.app.updateUser(id, dataload);

            if (!updated) {
                return res
                    .status(404)
                    .json({ error: "Usuario no encontrado o sin cambios" });
            }
            return res
                .status(200)
                .json({ message: "Usuario actualizado con éxito" });

        } catch (error) {
            if (error instanceof Error) {
                // Errores de validación llegan aquí con el mensaje que armamos en loadUpdateUserData
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getUserByld(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const user = await this.app.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    async getUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            // Validación del email usando Joi
            const { email } = loadEmail(req.params);

            const user = await this.app.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            return res.status(200).json(user);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }

            return res.status(500).json({
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : "Error desconocido",
            });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.app.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const deleted = await this.app.deleteUser(id);
            if (!deleted) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            return res.status(200).json({ message: "Usuario eliminado con éxito" });
        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}