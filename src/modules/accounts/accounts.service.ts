import Account from "modules/accounts/entities/account.entity";

export const findAccountById = async (accountId: string) => {
  const account = await Account.findById(accountId);
  if (!account) {
  }
};

export const createAccount = async () => {};
