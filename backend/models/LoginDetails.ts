import mongoose, { Document, Schema } from 'mongoose';

// Define the login details schema
export interface ILoginDetails extends Document {
  userId: mongoose.Types.ObjectId;
  ipAddress: string;
  userAgent: string;
  loginAt: Date;
}

const loginDetailsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  loginAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create and export the LoginDetails model
const LoginDetails = mongoose.model<ILoginDetails>('LoginDetails', loginDetailsSchema);

export default LoginDetails;
