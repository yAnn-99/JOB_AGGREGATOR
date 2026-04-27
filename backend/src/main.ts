import dotenv from 'dotenv';
dotenv.config();
import express, { response } from "express";
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Insert_User_DB } from "./middleware/InsertDB.ts"
import { MakeToken } from './middleware/MakeJwtToken.ts';
import { TokenCheck } from './middleware/CheckAuth.ts';
import bcrypt from 'bcryptjs';
import { nextTick } from 'node:process';
import { error } from 'node:console';




// const Token = process.env.TOKEN
// console.log(Token)

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


///////////////////////////////////////////////////////////////

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// export const temp_db = []

app.post('/register', async (req: Request, res: Response) => {

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const HashedPassword = await bcrypt.hash(user.password, 10)

  const NewUser = {
    email: user.email,
    password: HashedPassword
  }

  // need to push NewUser in db in the future
  // await Insert_User_DB(NewUser);


  const token = MakeToken(NewUser);

  res.cookie("Auth", token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: 'lax'
  });

  res.status(201).json({ message: 'User added' });


});


app.get('/login', async (req: Request, res: Response) => {

  const token = req.cookies.Auth;

  if (!token) {
    return res.status(401).json({ message: 'Please log in' });
  }

  const auth = TokenCheck(token);

  if (auth.valid) {
    return res.status(200).json({ message: "Have fun finding a job!!!!!!!!" });
  } else {
    return res.status(403).json({ message: "Wrong token, try logging in again" })
  }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


