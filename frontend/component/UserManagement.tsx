'use client';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";


export default function ManageUser({ userId }: { userId?: string }) {
    const [TrueId, SetId] = useState<string>(userId ?? "");


    const blockUser = async () => {
        if (TrueId == "") {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/block/${TrueId}`, {
                method: 'PUT',
                credentials: 'include',
            });
            if (response.ok) {
                alert('user blocked');
            }
        } catch (error) {
            alert(error)
        }
    };

    const delUser = async () => {
        if (TrueId == "") {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/delete/${TrueId}`, {
                method: 'DELETE',
                credentials: 'include',

            });
            if (response.ok) {
                alert('user deleted');
            }
        } catch (error) {
            alert(error)
        }
    };

    const UnblockUser = async () => {
        if (TrueId == "") {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/unblock/${TrueId}`, {
                method: 'PUT',
                credentials: 'include',

            })
            if (response.ok) {
                alert('user unblocked')
            }
        } catch (error) {
            alert(error)
        }
    }


    return (


        <div className="flex mt-5 flex-col lg:flex-row lg:px-7 gap-4 p-4 w-full">


            <Button variant="contained" onClick={UnblockUser} color='success' startIcon={<CheckCircleIcon />}>Unblock</Button>
            <Button variant="contained" onClick={blockUser} sx={{ backgroundColor: red[300] }} startIcon={<CancelIcon />} >Block</Button>
            <Button variant="contained" onClick={delUser} sx={{ backgroundColor: red[800] }} startIcon={<DeleteIcon />}>Delete</Button>

            <form className=" lg:flex-1" onSubmit={(e) => e.preventDefault()}>
                <label className="font-extrabold mb-5"> Id: </label>
                {/* <input type="text" name="id" value={TrueId} onChange={(e) => SetId(e.target.value)} className="border-2 w-full" /> */}
                <TextField id="outlined-basic" label="Input the desired Id..." variant="outlined" value={TrueId} onChange={(e) => SetId(e.target.value)} className='border-2 w-full' />

            </form>
        </div>
    )
}