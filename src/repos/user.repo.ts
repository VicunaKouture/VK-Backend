import { User } from "../models/user.model";
import { ds } from "../utils/datasource";

import { LoginUserDto, RegisterUserDto } from "../dtos/auth.dto";

const getByEmail = async (email: string) => {
  return await ds.getRepository(User).findOne({
    where: {
      email,
    },
  });
};

const save = async (user: User) => {
  return await ds.getRepository(User).save(user);
};

const register = async (user: RegisterUserDto) => {
  return await ds.getRepository(User).save(user);
};

export const userRepo = {
  getByEmail,
  register,
};
