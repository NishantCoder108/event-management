import { Request, Response } from "express";
// import { saveEvent } from "./models";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const eventData = req.body;
        const eventFile = req.file;

        if (eventFile) {
            eventData.attachment = eventFile.path;
        }
        console.log({ eventData });
        res.status(201).send({
            eventData,
            message: "Event created successfully",
        });

        // await saveEvent(eventData);
    } catch (error) {
        console.log("ERROR :", error);
        res.status(500).send({ message: "Error creating event", error: error });
    }
};
