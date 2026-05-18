import express from 'express';
import type { Request, Response } from 'express';
import { AdminCheck } from '../middleware/CheckAuth.ts';
import {rateLimit} from 'express-rate-limit';

const router = express.Router()
import { client } from '../middleware/InsertDB.ts';

//

var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);


router.get('/',AdminCheck, async (req: Request, res: Response) => {

    const result = await client.query(`SELECT * FROM "user"`);
    const info = result.rows
    res.send(info)
})

router.delete('/delete/:id',AdminCheck, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`DELETE FROM "user" WHERE "id" = $1`, [id])
        res.send('user deleted')
    } catch (error) {
    }

});

router.put('/block/:id',AdminCheck, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`UPDATE "user" SET "blocked" = True WHERE "id" = $1`, [id])
        res.send('user blocked')
    } catch (error) {
    }

});


router.put('/unblock/:id',AdminCheck, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`UPDATE "user" SET "blocked" = False WHERE "id" = $1`, [id])
        res.send('user unblocked');

    } catch (error) {
    }
})


export default router;
