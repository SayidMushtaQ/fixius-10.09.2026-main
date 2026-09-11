import mongoose from "mongoose";
import { connectDb } from "./backend/middleware/db";
import userDb from "./backend/models/userModel";

async function findHandyman() {
  await connectDb();
  const handyman = await userDb.findOne({ role: "handwerker" });
  if (handyman) {
    console.log("Found Handyman:", handyman.email);
  } else {
    console.log("No Handyman found");
  }
  process.exit();
}

findHandyman();
