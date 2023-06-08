import { Schema, model, Types, ObjectId } from "mongoose";
import { generateRandomAvatar } from "utils/randomAvatarGenerator";
import { generateRandomName } from "utils/randomNameGenerator";

export interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  password: string | null;
  emailVerified: boolean | null;
}

const userSchema = new Schema<UserDoc>({
  name: {
    type: String,
    default: generateRandomName,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: generateRandomAvatar,
  },
  password: {
    type: String,
    required: false,
    select: false,
    default: null,
  },
  emailVerified: {
    type: Boolean || null,
    default: null,
  },
});

const User = model<UserDoc>("user", userSchema);
export default User;
