import pool from "../config/db";

export const checkAndCreateTable = async (
    tableName: string,
    createTableQuery: string
) => {
    try {
        await pool.query(createTableQuery);
        console.log(`Table "${tableName}" checked/created`);
    } catch (err) {
        console.error(`Error creating table "${tableName}":`, err);
    }
};
