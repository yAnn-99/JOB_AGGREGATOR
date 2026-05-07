import express from 'express';
import { Router } from 'express';
import type { Request, Response } from 'express';


const router = express.Router()
import { client } from '../middleware/InsertDB.ts';

//

router.get('/user' , async (req:Request , res : Response) => {

    const result = await client.query (`SELECT * FROM "user"`) ;
    const info = result.rows
    res.send(info)
})

router.delete('/user/delete', async (req: Request, res: Response) => {
    res.json({ message: 'VICTOOOOOR' });
});

router.put('/user/block', async (req: Request, res: Response) => {
    res.json({ message: 'Hello from the block route' })
});


export default router;
