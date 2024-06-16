import { Router } from "express";
import { createEvent } from "./controllers";
import { getEvents } from "./controllers";

export const eventRoutes = Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);
