// import { temp_db } from "../main.ts";
import { Client, Pool } from 'pg';


export const client = new Pool({
    connectionString: process.env.URL,
});


export async function Insert_User_DB(payload, password) {
    const values = [
        payload.email,
        password,
        payload.lastname,
        payload.firstname,
    ];

    try {
        // await client.connect();
        const check = await client.query(`SELECT "firstname" FROM "user" WHERE "email" = $1`, [payload.email]);
        if (check.rows.length > 0) {
            return { valid: false, message: 'user already created' }
        } else {
            await client.query(`INSERT INTO "user"(email, password , lastname , firstname) VALUES($1, $2, $3, $4 )`, values);
            return { valid: true, message: 'user created' };

        }

    } catch (err) {
        console.log(err);
        return { valid: false, message: err };
    }
}

async function Insert_Pref_DB() {
    console.log('gonna input things into preferences')
}
