import { Router } from "express";
import { createEvent } from "./controllers/eventControllers";
import { getEvents } from "./controllers/eventControllers";
import { uploadFile } from "./controllers/uploadController";

export const eventRoutes = Router();

eventRoutes.post("/", uploadFile, createEvent);
eventRoutes.get("/", getEvents);
