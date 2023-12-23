import {
  DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../config/config";

import { DataSource } from "typeorm";
import { Sample } from "../models/sample.model";
import { User } from "../models/user.model";
export const ds = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DATABASE,
  // ssl: true,
  entities: [Sample, User],
  logging: true,
  synchronize: true,
});
