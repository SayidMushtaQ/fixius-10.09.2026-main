import userDb from "@/backend/models/userModel";
import User from "./interface";

// const checkUserExistence = async (id: string) => {
// 	const user = await userDb.findById(id);
// 	if (!user) {
// 		createError("User not found", 404);
// 	}
// };

export const updateUserById = async (id: string, data: any) => {
  if (!id) throw new Error("Se requiere una identificación de usuario");
  try {
    const updateUser = await userDb.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const updateUserByEmail = async (id: string, data: User) => {
  try {
    const updateUser = await userDb.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return updateUser;
  } catch (error) {
    throw error;
  }
};
