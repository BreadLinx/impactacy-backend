import { ObjectId } from "mongoose";
import { AccountType } from "modules/accounts/entities/account.entity";

export interface CreateAccountDto {
  accountId: string;
  type: AccountType;
  userId: ObjectId;
  email: string;
  name: string;
  image: string;
}
