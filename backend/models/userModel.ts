import mongoose, { Document, Model, Schema } from "mongoose";
const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["kunde", "handwerker", "admin"],
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      placeName: { type: String, required: true },
      zipCode: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
      formattedAddress: { type: String },
    },
    streetAddress: { type: String },
    password: {
      type: String,
    },

    backupPassword: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    active_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    otp: {
      type: String,
      default: "",
    },
    craftsman: { type: Schema.Types.ObjectId, ref: "Craftsman" },
    profile_photo: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/05/53/79/60/240_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
    },
    ip: { type: String, required: true },
    userId_for_admin_req: { type: String },
  },
  { timestamps: true },
);

// Define the Document interface for the main user schema
export interface IUserModel extends Document {
  name?: string;
  role: string;
  lastName: string;
  // zipCode: mongoose.Types.ObjectId;
  address: {
    placeName: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    formattedAddress?: string;
  };
  streetAddress: string;
  backupPassword: string;
  phone: string;
  email: string;
  password: string;
  otp: string;
  accessToken: string;
  refreshToken: string;
  status: boolean;
  profile_photo: string;
  craftsman?: mongoose.Types.ObjectId;
  ip: string;
  active_status: "active" | "inactive";
  userId_for_admin_req?: string;
}

// Define the model type for the user model
export type UserModel = Model<IUserModel>;

// Create the user model
const userDb =
  mongoose.models.userDb ??
  mongoose.model<IUserModel, UserModel>("userDb", userSchema);

export default userDb;
