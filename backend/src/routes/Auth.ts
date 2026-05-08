import { Router } from 'express';
import type { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import { MakeToken } from '../middleware/MakeJwtToken.ts';
import { Insert_User_DB, client } from '../middleware/InsertDB.ts';

const router = Router();

//////////////////////////////////////////////////////
// REGISTER
//////////////////////////////////////////////////////

router.post('/register', async (req: Request, res: Response) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  const token = MakeToken(newUser);

  const insert = await Insert_User_DB(newUser, hashedPassword);

  if (insert.valid) {

    res.cookie('AuthRegister', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });

    return res.status(201).json({
      message: 'User added'
    });
  }

  return res.status(400).json({
    message: 'user already existing'
  });
});

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

router.post('/login', async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const result = await client.query(
    `SELECT * FROM "user" WHERE "email" = $1`,
    [email]
  );

  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {

    const token = MakeToken({
      email: user.email
    });

    res.cookie('AuthLogin', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });

    return res.status(200).json({
      message: 'you are logged in'
    });
  }

  return res.status(401).json({
    message: 'Invalid email or password'
  });
});

//////////////////////////////////////////////////////
// ADMIN LOGIN
//////////////////////////////////////////////////////

router.post('/login/admin', async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const trueEmail = process.env.ADMIN_USERNAME;

  const truePassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD!,
    10
  );

  if (
    email === trueEmail &&
    await bcrypt.compare(password, truePassword)
  ) {

    const token = MakeToken({ email });

    res.cookie('AuthAdmin', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax'
    });

    return res.status(200).json({
      message: "you're in soldier"
    });
  }

  return res.status(401).json({
    message: 'nope'
  });
});

export default router;