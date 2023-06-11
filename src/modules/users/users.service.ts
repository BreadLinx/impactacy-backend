import { NotFoundError } from "errors/notFoundError";
import User from "modules/users/entities/user.entity";

export const getUserById = async (id: string) => {
  const user = (await User.findById(id))?.toJSON();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const getUserByIdWithPassword = async (id: string) => {
  const user = (await User.findById(id).select("+password"))?.toJSON();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const getUsersPasswordStatus = async (userId: string) => {
  const user = (await User.findById(userId).select("+password"))?.toJSON();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user.password ? true : false;
};

export const setInitialPassword = async (userId: string, password: string) => {
  const result = await User.findByIdAndUpdate();
};
