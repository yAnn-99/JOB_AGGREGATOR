// import { temp_db } from '../main.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//need to take info from the db and not from export list
export function MakeToken(payload) {
    const secret = process.env.SECRET;

    const token = jwt.sign(payload, secret);
    return token
}
