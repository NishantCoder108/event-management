import { Router } from "express";
import { createEvent } from "./controllers";

export const eventRoutes = Router();

eventRoutes.post("/", createEvent);
