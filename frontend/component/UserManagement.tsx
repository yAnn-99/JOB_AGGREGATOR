'use client';

export default function ManageUser() {
    const blockUser = () =>{
        alert("jfodjfklklsdf")
    };

    const delUser = () => {
        alert("hello")
    };


    return (
                    <div className="flex mt-5 flex-row-reverse">
                    <button onClick={blockUser} className="mr-6 bg-amber-500 p-2 rounded-xl">Block</button>
                    <button onClick={delUser} className="mr-6 bg-red-800 p-2 rounded-xl">Delete</button>
                </div>
    )
}