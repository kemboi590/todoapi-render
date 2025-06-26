import db from "./db";
import { TodoTable } from "./schema";
import { writeFileSync } from "fs";

async function exportTodos() {
    const todos = await db.query.TodoTable.findMany();
    writeFileSync("todos.json", JSON.stringify(todos, null, 2));
    console.log("Exported todos to todos.json");
    process.exit(0);
}

exportTodos();