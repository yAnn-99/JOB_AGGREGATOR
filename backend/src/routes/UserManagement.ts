import express from 'express';
import { Router } from 'express';
import type { Request, Response } from 'express';


const router = express.Router()
import { client } from '../middleware/InsertDB.ts';

//

router.get('/user', async (req: Request, res: Response) => {

    const result = await client.query(`SELECT * FROM "user"`);
    const info = result.rows
    res.send(info)
})

router.delete('/user/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`DELETE FROM "user" WHERE "id" = $1`, [id])
        alert('user deleted')
    } catch (error) {
        res.send(error);
    }

});

router.put('/user/block/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`UPDATE "user" SET "blocked" = True WHERE "id" = $1`, [id])
        res.send('user blocked')
    } catch (error) {
        res.send(error)
    }

});

router.put('/user/unblock/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await client.query(`UPDATE "user" SET "blocked" = False WHERE "id" = $1`, [id])
        res.send('user unblocked');

    } catch (error) {
        res.send(error)
    }
})


export default router;
