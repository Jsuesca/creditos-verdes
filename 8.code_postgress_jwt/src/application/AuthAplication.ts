import jwt from "jsonwebtoken";

const JWT_SECRET = "ashjf83uoiadu834uajh833hhysh24";

export class AuthApplication{
    static generateToken(payload:object): string{
        return jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
    }

    static verifyToken(token: string): any{
        return jwt.verify(token, JWT_SECRET);
    }
}
