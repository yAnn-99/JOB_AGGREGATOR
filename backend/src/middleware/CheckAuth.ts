import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function AuthCheck(req: Request, res: Response, next: Function) {

    const secret = process.env.SECRET;
    const token = req.cookies?.Auth;
    if (!token) {
        return res.status(401).json({ message: "Please register " });
    }

    try {
        const decoded = jwt.verify(token, secret);
        next();

    } catch (err) {
        return res.status(401).json({ valid: false, message: "Invalid credentials" });
    }
}


export async function AdminCheck(req: Request, res: Response, next: Function) {
    const secret = process.env.SECRET;

    const token = req.cookies?.AuthAdmin;
    if (!token) {
        return res.status(401).json({ message: 'you do not have a admin token, leave' })
    }

    try {
        const decoded = jwt.verify(token, secret);
        next();
    } catch {
        return res.status(401).json({ valid: false, message: "you are not welcome here , go home" });

    }

}