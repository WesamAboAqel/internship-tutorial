import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../services/s3.service.js";
import { Request, Response, NextFunction } from "express";


export const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (request: Request, file, cb) => {
            const username = request.body.username || "user";
            const ext = file.originalname.split(".").pop();
            const fileName = `${username}-${Date.now()}.${ext}`;
            request.body.fileName = fileName;
            cb(null, fileName);
        },
    }),
});
