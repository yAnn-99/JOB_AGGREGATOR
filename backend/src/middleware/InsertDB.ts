// import { temp_db } from "../main.ts";
import { Client } from 'pg';

export const client = new Client({
    connectionString: process.env.URL,
});

export async function Insert_User_DB(payload , password) {
    const values = [
        payload.email,
        password,
        payload.lastname,
        payload.firstname,
    ];

    const query = `INSERT INTO "user"(email, password , lastname , firstname) VALUES($1, $2, $3, $4 )`;
    try{

    await client.connect();
    await client.query(query, values)
    await client.query(`SELECT * FROM "user"`)
    } catch (err) {
        console.log(err);
        throw err ;
    }


    // await client.end()
}

async function Insert_Pref_DB() {
    console.log('gonna input things into preferences')
}
