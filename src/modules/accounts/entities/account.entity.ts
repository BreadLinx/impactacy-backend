import { Schema, model, Types, ObjectId } from "mongoose";

export enum AccountType {
  GOOGLE = "google",
}

export interface AccountDoc {
  accountId: string;
  type: AccountType;
  userId: ObjectId;
  email: string;
  createdAt: Date;
}

const accountSchema = new Schema<AccountDoc>({
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: Object.values(AccountType),
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = model<AccountDoc>("account", accountSchema);
export default Account;
