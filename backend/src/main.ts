import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { MakeToken } from './middleware/MakeJwtToken.ts';
import { AuthCheck } from './middleware/CheckAuth.ts';
import bcrypt from 'bcryptjs';
import { AdminCheck } from './middleware/CheckAuth.ts';
import { Insert_User_DB } from './middleware/InsertDB.ts';
import { client } from './middleware/InsertDB.ts';
import jobsroutes from "./routes/jobs.routes.ts";
import userrouter from './routes/UserManagement.ts';
import {rateLimit} from 'express-rate-limit';
import experienceRoutes from "./routes/experiences.routes.ts";
import skillsRoutes from "./routes/skills.routes.ts";
import favoritesRoutes from "./routes/favorites.routes.ts";
import applicationsRoutes from "./routes/applications.routes.ts";
import session from 'express-session';
import * as lusca from 'lusca';


const app = express();
const port = 3000;

const secret : string = process.env.SECRET!;

var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

app.set('trust proxy', 1);
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use(lusca.csrf({allowlist: ['/login', '/register', '/login/admin']}))
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use("/api/jobs", jobsroutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/applications", applicationsRoutes);


///////////////////////////////////////////////////////////////



app.post('/register', async (req: Request, res: Response) => {

  const HashedPassword = await bcrypt.hash(req.body.password, 10); // don't know if better to crypt on the fetch or on another var (guess after is more stable)  

  const NewUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    blocked: false
  }

  const token = MakeToken(NewUser);
  const insert = await Insert_User_DB(NewUser, HashedPassword);

  if (insert.valid) {

    res.cookie("AuthRegister", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });

    return res.status(201).json({ message: 'User added' });
  } else {
    return res.json({ message: 'user already existing' })
  }


});


app.post('/login', async (req: Request, res: Response) => { //need to take user input to compare

  const { email, password } = req.body;

  const result = await client.query(`SELECT * FROM "user" WHERE "email" = $1`, [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ message: " user does not exist" });
  }

  if (user.blocked == true) {
    return res.status(401).json({ message: 'You have been blocked, get lost' })
  }

  if (user && await bcrypt.compare(password, user.password)) {

    const token = MakeToken({ email: user.email }); // test fjopisdjfsopifjpiosdjfpiz
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
  const TruePassword = process.env.ADMIN_PASSWORD

  if (email == TrueEmail && password == TruePassword) {
    const token = MakeToken({ email: email });

    res.cookie("AuthAdmin", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });
    return res.status(200).json({ message: "you're in soldier" })
  } else {
    return res.status(401).json({ message: 'nope' })
  }

})


app.use('/user', userrouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



