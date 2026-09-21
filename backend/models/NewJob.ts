import mongoose, { Document, Model } from "mongoose";

// Define the schema for the JobPost document
const jobPostSchema = new mongoose.Schema(
  {
    category: { type: String },
    listingId: { type: Number },
    userId: { type: String },
    status: {
      type: String,
      default: "open",
      enum: ["open", "close", "pending", "accepted"],
    },
    // Admin moderation. `status` stays untouched so unblocking restores the
    // ad exactly as the owner left it.
    isBlocked: { type: Boolean, default: false },
    blockedReason: { type: String },
    blockedAt: { type: Date },
    blockedBy: { type: String },
    additional_details: {
      how_many_floors: { type: String },
      how_many_rooms: { type: String },
      square_meters: { type: String },
    },
    additional_job_description: { type: String },
    images: [String],
    contactDetails: {
      email: { type: String },
      name: { type: String },
      phone: { type: String },
    },

    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
      place_name: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    serviceTitle: {
      service_title: { type: String },
      square_meters: { type: String },
    },
    working_schedule: {
      type: String,
      default: "flexibel",
      enum: ["flexibel", "schnell", "in_einer_woche", "in_3_monaten"],
    },
  },
  { timestamps: true },
);

// Define the interface for the JobPost document
interface IJobPost extends Document {
  category: string;
  listingId: number;
  userId: string;
  status: string;
  isBlocked: boolean;
  blockedReason?: string;
  blockedAt?: Date;
  blockedBy?: string;
  additional_details: {
    how_many_floors: string;
    how_many_rooms: string;
    square_meters: string;
  };
  additional_job_description: string;
  contactDetails: {
    email: string;
    name: string;
    phone: string;
  };

  location: {
    type: string;
    coordinates: number[];
    zip_code: string;
    place_name: string;
  };
  images: string[];
  serviceTitle: {
    service_title: string;
    square_meters: string;
  };
  working_schedule: string;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes for common access patterns.
// (location.coordinates already has an inline 2dsphere index.)
jobPostSchema.index({ status: 1, isBlocked: 1, createdAt: -1 }); // status/moderation filter + recency sort (homepage/listings)
jobPostSchema.index({ isBlocked: 1, createdAt: -1 }); // admin moderation queue
jobPostSchema.index({ category: 1 }); // category filtering
jobPostSchema.index({ userId: 1 }); // per-user job history

// Define the model type for the JobPost model
type JobPostModel = Model<IJobPost>;

const JobPost =
  mongoose.models.JobPost ??
  mongoose.model<IJobPost, JobPostModel>("JobPost", jobPostSchema);
export default JobPost;
