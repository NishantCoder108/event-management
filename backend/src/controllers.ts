import { Request, Response } from "express";
import pool from "./config/db";
import { createEventTableQuery } from "./utils/eventTalbeQuery";
import { checkAndCreateTable } from "./utils/tableUtils";

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
        attachment: string | File;
    };
}

export const createEvent = async (req: EventRequest, res: Response) => {
    try {
        const eventData = req.body;
        const eventFile = req.file;

        if (eventFile) {
            eventData.attachment = eventFile.path;
        }

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
