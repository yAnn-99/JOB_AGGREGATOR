import express, { response } from "express";
import type { Request, Response } from 'express';
import { env } from "node:process";
import 'dotenv/config'

const Token = process.env.TOKEN
console.log(Token)


const app = express();
const port = 3000;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

