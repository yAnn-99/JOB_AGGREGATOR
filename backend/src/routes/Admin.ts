import { Router } from 'express';
import type { Request, Response } from 'express';
import {rateLimit} from 'express-rate-limit';

import { AdminCheck } from '../middleware/CheckAuth.ts';

const router = Router();

var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);

router.post('/test', AdminCheck, (req: Request, res: Response) => {
  res.json({
    message: 'you are on the admin page'
  });
});

export default router;