import express from "express";
import { askAI } from "../utils/askAI.js";

const router = express.Router();

router.post("/mentor", async (req, res) => {
  try {
    const { question } = req.body;

    const result = await askAI(question);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "AI failed" });
  }
});

export default router;
