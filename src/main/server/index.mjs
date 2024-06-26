import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import * as settings from "./settings.mjs"
import * as folders from "./folders.mjs"
import { startup } from "./startup.mjs"

const PORT = 64426
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/startup", startup)
app.get("/settings", settings.get)
app.put("/folders/add", folders.add)
app.delete("/folders/:id", folders.remove)
app.get("/folders", folders.getAll)
app.get("/folders/:id", folders.getById)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
