import mongoose, { Document, Schema } from "mongoose";

export interface IParticipant extends Document {
  name: string;
  email: string;
  phone: string;
  year: string;
  college: string;
  department: string;
  teamName: string;
  createdAt: Date;
}

const participantSchema = new Schema<IParticipant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IParticipant>(
  "Participant",
  participantSchema
);