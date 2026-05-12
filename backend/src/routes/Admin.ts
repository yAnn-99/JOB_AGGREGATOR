import { Router } from 'express';
import type { Request, Response } from 'express';

import { AdminCheck } from '../middleware/CheckAuth.ts';

const router = Router();

router.post('/test', AdminCheck, (req: Request, res: Response) => {
  res.json({
    message: 'you are on the admin page'
  });
});

export default router;