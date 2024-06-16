import mysql, { createPool, Pool } from "mysql2/promise";

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const connectToDatabase = async () => {
    try {
        await pool.getConnection();
        console.log("Connected to the MySQL database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

connectToDatabase();

export default pool;
