import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function AuthCheck(req: Request, res: Response, next: Function) {

    const secret = process.env.SECRET;
    const token = req.cookies?.Auth;
    if (!token) return res.status(401).json({ message: "Please log in" });

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
        return { message: "Have fun finding a job!!!!!!!!" };

    } catch (err) {
        return res.status(401).json({ valid: false, message: "Invalid credentials" });
    }
}


export async function AdminCheck(req: Request, res: Response, next: Function) {
    const TrueEmail = process.env.ADMIN_USERNAME;
    const TruePassword = process.env.ADMIN_PASSWORD;
    const { email, password } = req.body

    if (email == TrueEmail && password == TruePassword) {
        next();
    } else {
        return res.status(403).json({ message: "you are not welcome here , go home" });

    }}