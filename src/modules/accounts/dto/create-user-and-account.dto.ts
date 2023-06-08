import { ObjectId } from "mongoose";
import { AccountType } from "modules/accounts/entities/account.entity";

export interface CreateUserAndAccountDto {
  accountId: string;
  type: AccountType;
  email: string;
  name?: string;
  image?: string;
}
