import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt: {
    salt: process.env.SALT,
  },
  jwt: {
    secret: process.env.SECRET,
    expiresIn: process.env.EXPIRES_IN,
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_expiresIn: process.env.REFRESH_EXPIRES_IN,
  },
};
