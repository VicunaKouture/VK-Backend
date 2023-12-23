import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LoginUserDto, RegisterUserDto } from "../dtos/auth.dto";
import { userRepo } from "../repos/user.repo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const user = plainToClass(RegisterUserDto, req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: errors,
      });
    }

    const existingUser = await userRepo.getByEmail(user.email);
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    //create jwt token
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET!);

    const newUser = await userRepo.register(user);
    return res.status(201).json({
      status: true,
      data: newUser,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = plainToClass(LoginUserDto, req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: errors,
      });
    }

    const existingUser = await userRepo.getByEmail(user.email);
    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Email does not exist",
      });
    }

    const validPassword = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Invalid password",
      });
    }

    //create jwt token
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET!);

    return res.status(200).json({
      status: true,
      data: existingUser,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const googleCallback = async (req: Request, res: Response) => {
  console.log("req", req);
  console.log("user", req.user);
  console.log("token", req.user.token);
  const token = req.user.token;
  return res.redirect(`${process.env.FRONTEND_URL}googleToken`);
};

export const authController = {
  register,
  login,
  googleCallback,
};
