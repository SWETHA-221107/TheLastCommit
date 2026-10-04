import { Router } from "express";
import Participant from "../models/Participant.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      year,
      college,
      department,
      teamName,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !year ||
      !college ||
      !department ||
      !teamName
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingParticipant = await Participant.findOne({ email });

    if (existingParticipant) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    const participant = await Participant.create({
      name,
      email,
      phone,
      year,
      college,
      department,
      teamName,
    });

    res.status(201).json({
      message: "Registration successful",
      participant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/", async (_req, res) => {
  try {
    const participants = await Participant.find().sort({
      createdAt: -1,
    });

    res.json(participants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;