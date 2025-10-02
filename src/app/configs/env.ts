import dotenv from "dotenv";
import { cleanEnv, num, port, str } from "envalid";

dotenv.config();

const envVariables = cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRES_IN: str(),
  JWT_REFRESH_EXPIRES_IN: str(),
  SALT_ROUNDS: num(),
});

export default envVariables;
