import e, { Router } from "express";
import multer from "multer";
import path from "path";
import csv from "csvtojson";

interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, "../", "/uploads"));
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const filterCsv = (
  req: e.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype === "text/csv") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploads = multer({ storage: storage, fileFilter: filterCsv });

router.post("/upload-csv", uploads.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("File not Uploaded");
  }

  try {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).send("Error trying to parse the file");
    }
    const tramsactions: Transaction[] = await csv()
      .fromFile(filePath)
      .then((jsonCsv) => jsonCsv);

    res.json(tramsactions);
  } catch (error) {
    res.status(400).send("Error trying to parse the file");
  }
});

export default router;
