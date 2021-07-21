import { NextFunction, Request, Response } from "express"
import { ErrorsCode } from "../config/errors"
import { IUser } from "../models/user"
import { SESSION_SECRET } from "../util/env"
const jwt = require("jsonwebtoken")

export type RequestApp = Request & { user: IUser } & { [key: string]: any }

const safe_methods = ["/api/auth.*"]

export const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    next()
    return
  }
  for (const safe of safe_methods) {
    const regPath = new RegExp(safe)
    if (regPath.test(req.path)) {
      next()
      return
    }
  }
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      SESSION_SECRET,
      (err: Error, payload: IUser) => {
        if (!err) {
          req.user = payload as IUser
          next()
          return
        } else {
          res.status(401).json({
            errors: [
              { msg: "Login or password is not correct", code: ErrorsCode.PermissionDenied },
            ],
          })
        }
      },
    )
  }
}
