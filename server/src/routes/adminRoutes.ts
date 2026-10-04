import { Router } from "express";
import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "thelastcommit_secret";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      username,
      role: "admin",
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

router.get("/participants", protect, async (_req, res) => {
  try {
    const participants = await Participant.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json(participants);
  } catch {
    res.status(500).json({
      message: "Failed to fetch participants",
    });
  }
});

router.get("/analytics", protect, async (_req, res) => {
  try {
    const participants = await Participant.find();

    const totalParticipants = participants.length;

    const teams = new Set(
      participants.map((participant) => participant.teamName)
    );

    const years: Record<string, number> = {};
    const colleges: Record<string, number> = {};

    participants.forEach((participant) => {
      years[participant.year] = (years[participant.year] || 0) + 1;

      colleges[participant.college] =
        (colleges[participant.college] || 0) + 1;
    });

    res.json({
      totalParticipants,
      totalTeams: teams.size,
      years,
      colleges,
    });
  } catch {
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
});

export default router;