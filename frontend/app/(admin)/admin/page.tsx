import DataGridD from "@/component/data_table"

export default function Admin() {
    return (
        <main>
            {/* add input to help admin see db, like parametered query where they can search for someone info (name, email...) and get desired result (all infos or specific one) */}
            {/* to do that may need to fetch localhost:3000/user , and display infos as a excel table on the frontend*/}
                <h1>Data table</h1>

                <DataGridD></DataGridD>
                
        </main>
    )
}