import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  name?: string;
  email?: string;
  type: string;
  rating?: number;
  message: string;
  images?: string[];
  createdAt: Date;
}

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: ["bug", "suggestion", "question", "other"],
    default: "other",
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  message: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Feedback = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
