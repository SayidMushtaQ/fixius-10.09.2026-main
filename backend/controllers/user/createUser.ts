import userDb from "@/backend/models/userModel";
import { createError } from "@/backend/utils/errorHandler";
import User from "./interface";

const createUser = async (data: User) => {
  try {
    const { name, phone, email, address } = data;
    if (!phone || !email) {
      createError("Telefon und E-Mail sind erforderlich", 400);
    }

    // Check if user with the given email already exists
    const user = await userDb.findOne({ email });
    if (user) {
      createError("Der Benutzer existiert bereits", 401);
    }

    // Save the new user
    const userData = await new userDb(data).save();
    if (userData) {
      return userData;
    } else return null;
  } catch (error) {
    throw error;
  }
};

export { createUser };
