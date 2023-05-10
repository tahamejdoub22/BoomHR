import multer, { diskStorage } from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf" // Ajouter le type MIME pour les fichiers PDF
};

export default multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      callback(null, join(__dirname, "../public/cv"));
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_");
      let extension = MIME_TYPES[file.mimetype];
      if (file.mimetype === "application/pdf") {
        extension = "pdf";
      }
      callback(null, name + "." + extension);
    },
  }),
  limits: 1000 * 1024 * 1024,
}).single("cv");