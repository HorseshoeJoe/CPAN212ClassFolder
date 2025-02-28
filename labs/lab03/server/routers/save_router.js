import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.post("/multiple", upload.array("files", 3), (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  res.json({
    message: `${req.files.length} files uploaded`,
    filePaths: req.files.map((file) => `/uploads/${file.filename}`),
  });
});

router.post("/dog", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No dog image received" });
  }
  res.json({
    message: "Dog image saved!",
    path: `/uploads/${req.file.filename}`,
  });
});

export default router;
