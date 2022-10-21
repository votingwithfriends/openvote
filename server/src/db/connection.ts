import { DataSource } from "typeorm";
import path from "path";

// Load database environmental variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
const dbName = process.env.DB_NAME;

// Provide database configuration settings
export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbHost,
  username: dbUser,
  password: dbPw,
  database: dbName,
  port: 3306,
  entities: [path.join(__dirname, "../entities/*.ts")],
  logging: true,
  synchronize: true,
});
