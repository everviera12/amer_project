import { Pool } from "pg";

let connection: any;

if (!connection) {
  try {
    connection = new Pool({
      user: "postgres",
      host: "localhost",
      port: 5432,
      password: "12345",
      database: "amer_db",
    });

    console.log("--------- Database connected successfully ---------");
  } catch (error: any) {
    console.log("--------- Error connecting to the database: " + error.message);
  }
}

export { connection };
