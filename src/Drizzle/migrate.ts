import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, { client } from "./db"

// async function migration() {
//     console.log("......Migrations Started......");
//     await migrate(db, { migrationsFolder: __dirname + "/migrations" });
//     await client.end();
//     console.log("......Migrations Completed......");
//     process.exit(0); // 0 means success
// }

// migration().catch((error) => {
//     console.error("Migration failed:", error);
//     process.exit(1); // 1 means an error occurred
// });


// import db from "./db";
import { UsersTable } from "./schema";
import { writeFileSync } from "fs";

async function exportUsers() {
    try {
        const users = await db.query.UsersTable.findMany();
        writeFileSync("users.json", JSON.stringify(users, null, 2));
        console.log("Exported users to users.json");
        process.exit(0);
    } catch (error) {
        console.error("Export failed:", error);
        process.exit(1);
    }
}

exportUsers();