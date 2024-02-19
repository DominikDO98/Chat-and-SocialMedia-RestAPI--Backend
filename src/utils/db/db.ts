import { Pool } from "pg";
import { Config } from "./db.config";

const db = process.env.NODE_ENV === "test" ? Config.testConfig : Config.devConfig;
export const pool = new Pool(db);