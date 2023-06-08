import { NotFoundError } from "errors/notFoundError";
import User from "modules/users/entities/user.entity";

export const getUserById = async (id: string) => {
  const user = (await User.findById(id))?.toJSON();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};
