import dotenv from "dotenv"
import fs from "fs"
import logger from "./logger"

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables")
  dotenv.config({ path: ".env" })
} else {
  logger.debug("Using .env.example file to supply config environment variables")
  dotenv.config({ path: ".env.example" }) // you can delete this after you create your own .env file!
}

export const ENV = process.env.NODE_ENV
export const PROD = ENV === "production"

export const EXPRESS_PORT = process.env["EXPRESS_PORT"]

export const SESSION_SECRET = mustResolve("SESSION_SECRET")

// DB config
export const DB_NAME = mustResolve("DB_NAME")
export const DB_USER = mustResolve("DB_USER")
export const DB_PASSWORD = mustResolve("DB_PASSWORD")

// Время жизни токена
export const EXPIRES_IN = 60 * 30
export const EXPIRES_IN_REFRESH = 60 * 60 * 4

function mustResolve(name: string) {
  const value = process.env[name]
  if (!value) {
    logger.error(`No value for ${name}. Set ${name} environment variable.`)
    return process.exit(1)
  }
  return value
}
