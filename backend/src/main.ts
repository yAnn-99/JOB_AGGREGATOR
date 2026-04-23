import dotenv from 'dotenv';
dotenv.config();
import express, { response } from "express";
import type { Request, Response } from 'express';
import cors from 'cors';
import { env } from "node:process";
import test from "node:test";
import { CheckedAuth } from "./middleware/CheckAuth.ts"; //This is to check the token sent by the serv
import { PassThrough } from "node:stream";

const Token = process.env.TOKEN

const app = express();
const port = 3000;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


///////////////////////////////////////////////////////////////

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export const temp_db = []

app.post('/register', (req: Request, res: Response) => {

  interface Infos {
    email: string,
    password: string
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  temp_db.push(user);
  console.log(user);
  res.status(201).json({ message: 'User added' });


});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

