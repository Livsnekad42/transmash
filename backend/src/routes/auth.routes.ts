import express from "express"
import { ErrorsCode } from "../config/errors"
import { passwordVerification, setPassword } from "../controllers/user.controller"
import { IUser, UserModels } from "../models/user"
import { EXPIRES_IN, EXPIRES_IN_REFRESH, SESSION_SECRET } from "../util/env"
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")

export const AuthRouter = express.Router()

AuthRouter.post(
  "/signup",
  ...[check("email").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const user = req.body as IUser
    const _user = await UserModels.findOne({ where: { email: user.email } })
    if (!!_user) {
      res.status(400).json({
        errors: [{ msg: "User already exists", code: ErrorsCode.UserAlreadyExists }],
      })
      return
    }

    const hash = await setPassword(user)
    if (!hash) {
      res.status(400).json({
        errors: [{ msg: "Password contains invalid characters", code: ErrorsCode.TypeError }],
      })
    }

    res.status(200).json({
      response: true,
    })
  },
)

AuthRouter.post(
  "/signin",
  ...[check("email").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const user = req.body as IUser

    const _user = await UserModels.findOne({ where: { email: user.email } })
    if (!_user || !_user?.password) {
      res.status(400).json({
        errors: [{ msg: "Login or password is not correct", code: ErrorsCode.PermissionDenied }],
      })
      return
    }

    const isValidPassword = await passwordVerification(user, _user.password)
    if (!isValidPassword) {
      res.status(400).json({
        errors: [{ msg: "Login or password is not correct", code: ErrorsCode.PermissionDenied }],
      })
    }

    const data = {
      email: _user.email,
      token: await jwt.sign(
        {
          id: _user.id,
          ffsToken: _user.ffsToken,
          providerId: user.providerId,
        },
        SESSION_SECRET,
        { expiresIn: EXPIRES_IN },
      ),
      refreshToken: await jwt.sign(
        {
          id: _user.id,
        },
        SESSION_SECRET,
        { expiresIn: EXPIRES_IN_REFRESH },
      ),
    }
    res.status(200).json(data)
  },
)

AuthRouter.post("/token", check("refreshToken").exists(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const data = req.body
  let userID: number

  if (!!data.refreshToken) {
    jwt.verify(data.refreshToken, SESSION_SECRET, async (err: Error, payload: IUser) => {
      if (!!err) {
        res.status(401).json({
          errors: [{ msg: "Credentials were not provided", code: ErrorsCode.PermissionDenied }],
        })
        return
      }
      userID = ~~payload.id!
      const user = await UserModels.findOne({
        where: {
          id: userID,
        },
      })

      if (!user) {
        res.status(401).json({
          errors: [{ msg: "Credentials were not provided", code: ErrorsCode.PermissionDenied }],
        })
        return
      } else {
        const data = {
          email: user.email,
          token: jwt.sign(
            {
              id: user.id,
              ffsToken: user.ffsToken,
              providerId: user.providerId,
            },
            SESSION_SECRET,
            { expiresIn: EXPIRES_IN },
          ),
          refreshToken: jwt.sign(
            {
              id: user.id,
            },
            SESSION_SECRET,
            { expiresIn: EXPIRES_IN_REFRESH },
          ),
        }
        res.status(200).json(data)
      }
    })
  } else {
    res.status(400).json({
      errors: [{ msg: "Credentials were not provided", code: ErrorsCode.PermissionDenied }],
    })
  }
})

AuthRouter.post("/post-test", null, (req, res, next) => {
  try {
    console.log(req.body)
    next()
    return res.status(200).json(req.body)
  } catch (e) {
    console.log("error", e)
  }
})

/*
AuthRouter.get("/hui", async (req, res, next) => {
  try {
    const myUser = await WorkerModels.findOne({ where: { id: 50 } })
    next()
    res.status(200).json({
      response: true,
      names: myUser.names,
      id: myUser.id,
      age: myUser.age,
      accuracy: myUser.accuracy,
    })
    res.status(200).json({
      response: true,
      names: myUser.names,
      id: myUser.id,
      age: myUser.age,
      accuracy: myUser.accuracy,
    })
  } catch (e) {
    console.log("error", e)
  }
})
*/
