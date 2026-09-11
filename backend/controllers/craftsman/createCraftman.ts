import CraftsmanModel from "@/backend/models/CrafstmanModel";
import { createError } from "@/backend/utils/errorHandler";
import { generateRandomPassword } from "@/helper/generateRandomPassword";
import { transporter } from "@/helper/mailTransporter";
import { sendMailSailerOptionForCraftman } from "@/helper/sendConfEmailForCraftMan";
import bcrypt from "bcryptjs";
import { CraftmanDetails } from ".";
import { createUser } from "../user/createUser";
import User from "../user/interface";

export const RegisterCraftMan = async (data: any, ipAddress: string) => {
  try {
    const {
      name,
      role,
      lastName,
      phone,
      email,
      craftmanDetails,
      address,
      streetAddress,
      ip,
    } = data;
    let { services, documents, company_name, images, description } =
      craftmanDetails;

    // Validate required fields
    if (!name || !role || !phone || !email || !address || !services) {
      createError("Missing required fields", 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      createError("Ungültiges E-Mail-Format", 400);
    }

    // Generate a random password
    const generatedPassword = generateRandomPassword(8);

    // Hash the generated password using bcrypt
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const userObj: User = {
      name,
      phone,
      address,
      email,
      accessToken: "",
      refreshToken: "",
      role,
      lastName,
      password: "",
      streetAddress,
      otp: hashedPassword,
      ip: ipAddress,
      active_status: "inactive",
    };

    company_name = company_name.split(" ").join("-").toLowerCase();
    // Create a new user using the userDb model
    const isCraftmanExist = await CraftsmanModel.findOne({ company_name });
    if (isCraftmanExist) createError("Der Firmenname existiert bereits", 400);

    const newUser = await createUser(userObj);

    // Create a new craftman profile using the craftman model
    const craftmanObj: CraftmanDetails = {
      user: newUser._id,
      images,
      company_name,
      description,
      documents,
      services,
    };
    const craftman = await CraftsmanModel.create(craftmanObj);
    // Send an email with the generated password
    try {
      await transporter.sendMail(
        sendMailSailerOptionForCraftman(email, generatedPassword, craftman._id)
      );
    } catch (mailError) {
      console.error("Failed to send registration email:", mailError);
      // We don't throw here so registration can complete in dev/test
    }

    // Return success response
    return { ...newUser._doc, craftmanDetails: craftman };
  } catch (error) {
    throw error;
  }
};

export default RegisterCraftMan;
