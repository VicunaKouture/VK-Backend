import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../models/user.model";
import { userRepo } from "../repos/user.repo";

const { ExtractJwt } = passportJWT;

const JwtStrategy = passportJWT.Strategy;

passport.use(
  "checkJWT",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET!,
    },
    async (jwtPayload: any, done) => {
      try {
        const email: string = String(jwtPayload.email);
        const user = await userRepo.getByEmail(email);
        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: error.message || "Something went wrong with your token",
        });
      }
    }
  )
);

export default passport;
