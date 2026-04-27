import { error } from "node:console";
import { MakeToken } from "./MakeJwtToken.ts"
import jwt from 'jsonwebtoken';



export function TokenCheck(token) {
    const secret = process.env.SECRET
    try {
        const decoded = jwt.verify(token, secret);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error }
    }
}
