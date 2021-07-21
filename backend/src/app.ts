import express from "express"
import path from "path"
import { dbConfig } from "./config/db"
import { JWTMiddleware } from "./middleware/jwt.middleware"
import { EXPRESS_PORT } from "./util/env"
const cors = require("cors")

// Create Express server
const app = express()
const router = express.Router()
// Express configuration
app.set("port", EXPRESS_PORT || 3000)
app.use(cors())
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }))
// app.use(passport.initialize());
//parse requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS")
  res.header("Access-Control-Allow-Origin", "*")
  res.header("X-Requested-With", "*")
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  next()
})
app.use(JWTMiddleware)
app.use("/", router)

router.post("/post-test", (req, res, next) => {
  console.log("Got body post:", req.body)
  res.status(200).json(req.body).send(req.body)
})

router.get("/post-test", (req, res, next) => {
  console.log("Got body get:", req.body)
  res.sendStatus(200)
})

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

dbConfig.sync({ force: true }).then((result) => {
  console.log("Migrate DB")
})

app.get("/", async (_, res, next) => {
  res.status(200).json({ response: true, blabla: "hui" })
})

/*
app.post("/pizda", async function (_, res, next) {
  try {
    const newUser = _.body as IWorker
    const user = await WorkerModels.create({
      names: newUser.names,
      id: newUser.id,
      accuracy: newUser.accuracy,
      age: newUser.age,
    })
    res.status(200).json({
      response: true,
    })
  } catch (e) {
    console.log("error", e)
  }
})

app.get("/hui", async (_, res, next) => {
  try {
    const myUser = await WorkerModels.findOne({ where: { id: 50 } })
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

export default app
