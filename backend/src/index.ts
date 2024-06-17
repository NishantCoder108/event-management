import "dotenv/config";
import express from "express";
import multer from "multer";
import { eventRoutes } from "./routes";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

const upload = multer({ dest: "uploads/" });

app.use("/api/events", upload.single("attachment"), eventRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
