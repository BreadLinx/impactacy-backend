import passportGoogle from "passport-google-oauth20";
import { mongooseConnection } from "app";
import User, { UserDoc } from "modules/users/entities/user.entity";
import Account, { AccountType } from "modules/accounts/entities/account.entity";
import { UnauthorizedError } from "errors/unauthorizedError";
import dotenv from "dotenv";
import { ConflictError } from "errors/conflictError";
dotenv.config();

const {
  GOOGLE_CLIENT_ID = "secret",
  GOOGLE_CLIENT_SECRET = "secret",
  BACKEND_URL = "http://localhost:5000",
} = process.env;

export const googleStrategy = new passportGoogle.Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/callback/google`,
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const account = await Account.findOne({
        accountId: profile._json.sub,
      });

      if (account) {
        const user = (await User.findById(account.userId)) as UserDoc;
        return done(null, user);
      }

      const userByEmail = await User.findOne({ email: profile._json.email });

      if (userByEmail) {
        return done(
          new UnauthorizedError(
            "Auth provider differs from the one used initially, please use the same provider you used to sign up or which you linked to your account",
          ),
        );
      }
    } catch (err: any) {
      return done(err);
    }

    const session = await mongooseConnection.startSession();

    try {
      session.startTransaction();

      const newUser = (await User.create(
        [
          {
            email: profile._json.email,
            name: profile._json.name,
            image: profile._json.picture,
          },
        ],

        {
          session,
        },
      )) as UserDoc[];

      await Account.create(
        [
          {
            accountId: profile._json.sub,
            type: AccountType.GOOGLE,
            userId: newUser[0]._id,
            email: profile._json.email,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      await session.endSession();

      done(null, newUser[0]);
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      done(err);
    }
  },
);

export const linkGoogleStrategy = new passportGoogle.Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/callback/link/google`,
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const account = await Account.findOne({
        accountId: profile._json.sub,
      });

      if (account) {
        throw new ConflictError("Account already exists");
      }

      const newAccount = await Account.create({
        accountId: profile._json.sub,
        type: AccountType.GOOGLE,
        userId: "6481f9646aae47319bd727e3", // imitation of _id
        email: profile._json.email,
      });

      done(null, newAccount);
    } catch (err: any) {
      done(err);
    }
  },
);
