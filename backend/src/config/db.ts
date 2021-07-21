import * as sequelize from "sequelize"
import { DB_NAME, DB_PASSWORD, DB_USER } from "../util/env"

export const dbConfig = new sequelize.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
})
