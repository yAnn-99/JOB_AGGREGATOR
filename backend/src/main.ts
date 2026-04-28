import dotenv from 'dotenv';
dotenv.config();
import express, { response } from "express";
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Insert_User_DB } from "./middleware/InsertDB.ts"
import { MakeToken } from './middleware/MakeJwtToken.ts';
import { AuthCheck } from './middleware/CheckAuth.ts';
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

// To protect a route, you have to pass the AuthCheck func in parameter

app.get('/',AuthCheck, (req: Request, res: Response) => {
  res.send('Hello from protected route');
});


app.post('/register', async (req: Request, res: Response) => {

  const HashedPassword = await bcrypt.hash(req.body.password, 10); // don't know if better to crypt on the fetch or on another var (guess after is more stable)  
  
  const NewUser = {
    email: req.body.email,
    firstname : req.body.firstname,
    lastname : req.body.lastname
    
  }


  const token = MakeToken(NewUser);
  await Insert_User_DB(NewUser, HashedPassword);

  res.cookie("Auth", token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: 'lax'
  });

  res.status(201).json({ message: 'User added' });


});


app.post('/login', async (req: Request, res: Response) => { //need to take user input to compare

  const token = req.cookies.Auth;
  
  const request = {
    email: req.body.email,
    password: req.body.password
  };

  if (!token) {
    return res.status(401).json({ message: 'Please log in' });
  }

  const auth = await AuthCheck(token , request);

  if (auth.valid) {
    return res.status(200).json({ message: "Have fun finding a job!!!!!!!!" });
  } else {
    return res.status(403).json({ error : auth.message })
  }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


