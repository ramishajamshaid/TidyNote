import multer from "multer";
import fs from "fs";
import path from "path";
import os from "os";

const tempDir = path.join(os.tmpdir(), "tidynote-uploads");

fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });