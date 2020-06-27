import { resolve } from "path";
import crypto from "crypto";
import multer from "multer";

const road = resolve(__dirname, "..", "..", "tmp");

export default {
  directory: road,
  storage: multer.diskStorage({
    destination: road,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
