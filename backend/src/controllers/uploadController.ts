import { Request, Response, NextFunction } from "express";
import multer from "multer";
import s3 from "../config/s3";
import path from "path";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileContent = fs.readFileSync(file.path);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: `${Date.now()}_${path.basename(file.originalname)}`,
            Body: fileContent,
            ContentType: file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        fs.unlinkSync(file.path); // Remove file from local storage

        req.body.attachment = uploadResult.Location;

        next();
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};

export default upload;
