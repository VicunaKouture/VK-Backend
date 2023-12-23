import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { userRepo } from "../repos/user.repo";

const serverUrl: string = process.env.SERVER_URL!;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const token = jwt.sign(
      {
        email: profile.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const data: { user?: User; token?: string } = {};
    try {
      const oldUser = await userRepo.getByEmail(profile.email);
      if (oldUser) {
        data.user = oldUser;
        data.token = token;
        return done(null, data);
      }
    } catch (err) {
      console.log(err.message);
    }

    try {
      const newUser = new User();
      newUser.email = profile.email;
      newUser.name = profile.displayName;
      const user = await userRepo.register(newUser);
      data.user = user;
      data.token = token;
      return done(null, data);
    } catch (err) {
      console.log(err.message);
    }
  }
);

passport.use(googleLogin);

const authenticate = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: false,
});

export const googleAuth = {
  authenticate,
  googleCallback,
};
