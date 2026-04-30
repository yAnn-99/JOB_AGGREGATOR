import dotenv from 'dotenv';
dotenv.config();
import express, { response } from "express";
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import https from "https";
import fs from "fs";
import cors from 'cors';
import { MakeToken } from './middleware/MakeJwtToken.ts';
import { AuthCheck } from './middleware/CheckAuth.ts';
import bcrypt from 'bcryptjs';
import { AdminCheck } from './middleware/CheckAuth.ts';
import { Insert_User_DB } from './middleware/InsertDB.ts';
import { client } from './middleware/InsertDB.ts';



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

app.get('/user', AuthCheck, (req: Request, res: Response) => {
  res.json({ message: 'Hello from protected route' });
});

app.post('/test/admin', AdminCheck, (req: Request, res: Response) => {
  res.json({ message: 'you are on the admin page' })
})




app.post('/register', async (req: Request, res: Response) => {

  const HashedPassword = await bcrypt.hash(req.body.password, 10); // don't know if better to crypt on the fetch or on another var (guess after is more stable)  

  const NewUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }

  const token = MakeToken(NewUser);
  const insert = await Insert_User_DB(NewUser, HashedPassword);

  if (insert.valid) {

    res.cookie("AuthRegister", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });
    res.status(201).json({ message: 'User added' });
  } else {
    res.json({ message: 'user already existing' })
  }

});


app.post('/login', async (req: Request, res: Response) => { //need to take user input to compare

  const { email, password } = req.body;

  const result = await client.query(`SELECT * FROM "user" WHERE "email" = $1`, [email]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {

    const token = MakeToken({ id: user.id, email: user.email });
    res.cookie("AuthLogin", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });
    return res.status(200).json({ message: "you are logged in" });
  }
  return res.status(401).json({ message: "Invalid email or password" });
});


app.post('/login/admin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const TrueEmail = process.env.ADMIN_USERNAME;
  const TruePassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  if (email == TrueEmail && await bcrypt.compare(password, TruePassword)) {
    const token = MakeToken({ email: email });

    res.cookie("AuthAdmin", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });
    return res.status(200).json({message : "you're in soldier"})
  } else {
    res.status(401).json({message : 'nope'})
  }

})

const sslOptions = {
  key: fs.readFileSync('/usr/src/app/certs/key.pem'),
  cert: fs.readFileSync("/usr/src/app/certs/cert.pem")
};

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS Server running at https://localhost:${port}`);
});


