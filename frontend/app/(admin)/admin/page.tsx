import DataGridD from "@/component/data_table"
import ManageUser from "@/component/UserManagement"

export default function Admin() {
    return (
        <main>
            {/* add input to help admin see db, like parametered query where they can search for someone info (name, email...) and get desired result (all infos or specific one) */}
            {/* to do that may need to fetch localhost:3000/user , and display infos as a excel table on the frontend*/}
                <h1 className="px-4 py-2 items-center bg-indigo-500 text-white rounded-md mt-3 mb-3 lg:ml-3 lg:w-fit lg:items-start ">Data table</h1>

                <DataGridD/>
                <ManageUser/>
                
        </main>
    )
}