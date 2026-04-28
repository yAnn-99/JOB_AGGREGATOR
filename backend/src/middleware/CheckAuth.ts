import { MakeToken } from "./MakeJwtToken.ts"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { client } from "./InsertDB.ts";


export async function AuthCheck(token, payload) {
    const secret = process.env.SECRET;
    const password = await client.query(`SELECT "password" FROM "user" WHERE "email" = $1`, [payload.email])

    try {
        const decoded = jwt.verify(token, secret);
        const match = await bcrypt.compare(payload.password, password.rows[0].password)
        if (match) {
            return { valid: true, decoded };
        } else {
            return { valid : false , message : "Invalid password"};
        }

    } catch (err) {
        return { valid: false, message : "Invalid credentials" };
    }
}
