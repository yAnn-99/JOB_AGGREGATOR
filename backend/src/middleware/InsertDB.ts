// import { temp_db } from "../main.ts";
import {Client} from 'pg';

const client = new Client({
  connectionString: process.env.URL,
});

//need to insert name and hashed password into the user table
// will be useful for identification later on
export async function Insert_User_DB(payload) {
    const email = payload.email;
    const password = payload.password;
    
    await client.connect();
    await client.query('SELECT NOW()');
    client.end()
}

async function Insert_Pref_DB() {
    console.log('gonna input things into preferences')
}
