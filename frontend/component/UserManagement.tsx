'use client';

import { useEffect, useState } from "react";


export default function ManageUser({ userId }: { userId?: number }) {
    const [TrueId, SetId] = useState<any>(userId);

    if (userId == undefined) {
        SetId(userId)
    }

    const blockUser = async () => {
        if (!TrueId) {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/block/${TrueId}`, {
                method: 'PUT'
            });
            if (response.ok) {
                alert('user blocked');
            }
        } catch (error) {
            alert(error)
        }
    };

    const delUser = async () => {
        if (!TrueId) {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/delete/${TrueId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('user deleted');
            }
        } catch (error) {
            alert(error)
        }
    };

    const UnblockUser = async () => {
        if (!TrueId) {
            return alert('Input your id')
        }
        try {
            const response = await fetch(`http://localhost:3000/user/unblock/${TrueId}`, {
                method: 'PUT'
            })
            if (response.ok) {
                alert('user unblocked')
            }
        } catch (error) {
            alert(error)
        }
    }


    return (


        <div className="flex mt-5 flex-col lg:flex-row-reverse  gap-4 p-4 w-full">

            <button onClick={UnblockUser} className="lg:mr-6 lg:pr-3 lg:pl-3 bg-green-500 hover:bg-green-700 p-2 rounded-xl ">Unblock</button>
            <button onClick={blockUser} className="lg:mr-6 lg:pr-3 lg:pl-3 bg-amber-500 hover:bg-amber-700 p-2 rounded-xl">Block</button>
            <button onClick={delUser} className="lg:mr-6 lg:pr-3 lg:pl-3 bg-red-800 hover:bg-red-950 p-2 rounded-xl">Delete</button>
            <form className="mr-6 " onSubmit={(e) => e.preventDefault()}>
                <label className="font-extrabold"> Id: </label>
                <input type="text" name="id" value={TrueId} onChange={(e) => SetId(e.target.value)} className="border-2 w-full" />
            </form>
        </div>
    )
}