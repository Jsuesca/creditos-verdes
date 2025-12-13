import { Request, Response, NextFunction } from "express";
import { AuthApplication } from "../../application/AuthApplication";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Formato de token inválido" });
        return;
    }

    try {
        const payload = AuthApplication.verifyToken(token);
        (req as any).user = payload;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado" });
    }
}
