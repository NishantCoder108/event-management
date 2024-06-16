import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { eventRoutes } from "./routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.use((req, res, next) => {
    console.log("Request body: " + JSON.stringify(req.body, null, 2));
    const file = req.file;
    console.log("File: ", file, JSON.stringify(file, null, 2));
    next();
});
app.use("/api/events", upload.single("attachment"), eventRoutes);

app.get("/test", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
