import { Request, Response } from "express";
import pool from "../config/db";
import { createEventTableQuery } from "../utils/eventTalbeQuery";
import { checkAndCreateTable } from "../utils/tableUtils";

interface EventRequest extends Request {
    body: {
        eventName: string;
        datetime: string;
        duration: number;
        location: string;
        agenda: string;
        guests: string[];
        reminder: string;
        notification: string;
        attachment?: string | File;
    };
}

export const createEvent = async (req: EventRequest, res: Response) => {
    try {
        const eventData = req.body;

        const {
            eventName,
            datetime,
            duration,
            location,
            agenda,
            guests,
            reminder,
            notification,
            attachment,
        } = eventData;

        if (
            !eventName ||
            !datetime ||
            !duration ||
            !location ||
            !agenda ||
            !guests ||
            !reminder ||
            !notification ||
            !attachment
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        await checkAndCreateTable("events", createEventTableQuery);

        const query = `
        INSERT INTO events (eventName, datetime, duration, location, agenda, guests, reminder, notification, attachment)
        VALUES (?, FROM_UNIXTIME(? / 1000), ?, ?, ?, ?, ?, ?, ?)
      `;

        const [results] = await pool.execute(query, [
            eventName,
            datetime,
            duration,
            location,
            agenda,
            guests,
            reminder,
            notification,
            attachment,
        ]);

        console.log("Event saved:", results);
        res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
        console.log("ERROR :", error);
        res.status(500).send({ message: "Error creating event", error: error });
    }
};

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { duration, lessthan, status } = req.query;

        let query = "SELECT * FROM events";
        const queryParams: any[] = [];
        const conditions: string[] = [];

        if (duration) {
            if (lessthan === "true") {
                conditions.push("duration <= ?");
            } else {
                conditions.push("duration = ?");
            }
            queryParams.push(Number(duration));
        }

        if (status) {
            const now = new Date().toISOString().slice(0, 19).replace("T", " "); // Get current time in SQL format
            if (status === "completed") {
                conditions.push("datetime < ?");
                queryParams.push(now);
            } else if (status === "ongoing") {
                conditions.push(
                    "datetime <= ? AND datetime + INTERVAL duration / 1000 SECOND > ?"
                );
                queryParams.push(now, now);
            } else if (status === "upcoming") {
                conditions.push("datetime > ?");
                queryParams.push(now);
            }
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        const [events] = await pool.execute(query, queryParams);

        res.status(200).json(events);
    } catch (error) {
        console.log("Error fetching events", error);

        res.status(500).json({
            error: error,
            message: "Failed to fetch events",
        });
    }
};

// 30 minutes = 30 * 60 * 1000 = 1800000 milliseconds
// 1 hour = 60 * 60 * 1000 = 3600000 milliseconds
// 1.5 hours = 1.5 * 60 * 60 * 1000 = 5400000 milliseconds
// 2 hours = 2 * 60 * 60 * 1000 = 7200000 milliseconds
// 2.5 hours = 2.5 * 60 * 60 * 1000 = 9000000 milliseconds
// 3 hours = 3 * 60 * 60 * 1000 = 10800000 milliseconds
// 4 hours = 4 * 60 * 60 * 1000 = 14400000 milliseconds
// 5 hours = 5 * 60 * 60 * 1000 = 18000000 milliseconds
