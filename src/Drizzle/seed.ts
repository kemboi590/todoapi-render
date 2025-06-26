import db from "./db";
import { UsersTable, TodoTable } from "./schema";

async function seed() {
    console.log("Seeding to database started...");

    // Optional: Clear existing data for idempotency
    await db.delete(TodoTable);
    await db.delete(UsersTable);

    // Insert 4 users
    const users = [
        {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice@example.com",
            password: "hashedpassword1",
            role: "user" as "user",
            isVerified: true,
            verificationCode: "ABC123"
        },
        {
            firstName: "Bob",
            lastName: "Smith",
            email: "bob@example.com",
            password: "hashedpassword2",
            role: "admin" as "admin",
            isVerified: true,
            verificationCode: "DEF456"
        },
        {
            firstName: "Charlie",
            lastName: "Brown",
            email: "charlie@example.com",
            password: "hashedpassword3",
            role: "user" as "user",
            isVerified: false,
            verificationCode: "GHI789"
        },
        {
            firstName: "Diana",
            lastName: "Prince",
            email: "diana@example.com",
            password: "hashedpassword4",
            role: "user" as "user",
            isVerified: true,
            verificationCode: "JKL012"
        }
    ];

    // Insert users and get their IDs
    const insertedUsers = await db.insert(UsersTable).values(users).returning({ id: UsersTable.id });

    // Manually add 20 todos, assigning them to users by index
    const todos = [
        {
            userId: insertedUsers[0].id,
            todoName: "Finish TypeScript project",
            description: "Complete the backend API using TypeScript.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 1 * 86400000)
        },
        {
            userId: insertedUsers[1].id,
            todoName: "Write unit tests",
            description: "Add unit tests for the authentication module.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 2 * 86400000)
        },
        {
            userId: insertedUsers[2].id,
            todoName: "Update documentation",
            description: "Update the API documentation with new endpoints.",
            isCompleted: true,
            dueDate: new Date(Date.now() + 3 * 86400000)
        },
        {
            userId: insertedUsers[3].id,
            todoName: "Deploy to Azure",
            description: "Deploy the latest build to Azure App Service.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 4 * 86400000)
        },
        {
            userId: insertedUsers[0].id,
            todoName: "Refactor codebase",
            description: "Refactor the codebase for better readability.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 5 * 86400000)
        },
        {
            userId: insertedUsers[1].id,
            todoName: "Optimize queries",
            description: "Optimize SQL queries for performance.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 6 * 86400000)
        },
        {
            userId: insertedUsers[2].id,
            todoName: "Implement CORS",
            description: "Add CORS support for frontend integration.",
            isCompleted: true,
            dueDate: new Date(Date.now() + 7 * 86400000)
        },
        {
            userId: insertedUsers[3].id,
            todoName: "Set up CI/CD",
            description: "Configure GitHub Actions for CI/CD.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 8 * 86400000)
        },
        {
            userId: insertedUsers[0].id,
            todoName: "Add logging",
            description: "Integrate Winston for logging.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 9 * 86400000)
        },
        {
            userId: insertedUsers[1].id,
            todoName: "Implement authentication",
            description: "Add JWT authentication to the API.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 10 * 86400000)
        },
        {
            userId: insertedUsers[2].id,
            todoName: "Create user dashboard",
            description: "Develop the user dashboard UI.",
            isCompleted: true,
            dueDate: new Date(Date.now() + 11 * 86400000)
        },
        {
            userId: insertedUsers[3].id,
            todoName: "Fix bug in registration",
            description: "Resolve the registration bug reported by QA.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 12 * 86400000)
        },
        {
            userId: insertedUsers[0].id,
            todoName: "Upgrade dependencies",
            description: "Update all npm dependencies to latest versions.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 13 * 86400000)
        },
        {
            userId: insertedUsers[1].id,
            todoName: "Add forgot password",
            description: "Implement forgot password functionality.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 14 * 86400000)
        },
        {
            userId: insertedUsers[2].id,
            todoName: "Integrate Redis cache",
            description: "Add Redis caching for sessions.",
            isCompleted: true,
            dueDate: new Date(Date.now() + 15 * 86400000)
        },
        {
            userId: insertedUsers[3].id,
            todoName: "Write integration tests",
            description: "Add integration tests for the todo API.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 16 * 86400000)
        },
        {
            userId: insertedUsers[0].id,
            todoName: "Implement role-based access",
            description: "Add RBAC to the API endpoints.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 17 * 86400000)
        },
        {
            userId: insertedUsers[1].id,
            todoName: "Add Swagger docs",
            description: "Document API using Swagger.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 18 * 86400000)
        },
        {
            userId: insertedUsers[2].id,
            todoName: "Enable dark mode",
            description: "Add dark mode to the frontend.",
            isCompleted: true,
            dueDate: new Date(Date.now() + 19 * 86400000)
        },
        {
            userId: insertedUsers[3].id,
            todoName: "Automate backups",
            description: "Set up automated database backups.",
            isCompleted: false,
            dueDate: new Date(Date.now() + 20 * 86400000)
        }
    ];

    await db.insert(TodoTable).values(todos);

    console.log("Seeding to database completed successfully.");
    process.exit(0); // 0 means success
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1); // 1 means an error occurred
});