import { dbSettings } from "./scripts/database.mjs"

export const get = async (req, res) => {
  console.log("GET /settings")
  const settings = await dbSettings.get()
  res.json(settings)
}

export const update = async (req, res) => {
  console.log("PUT /settings")
  const settings = await dbSettings.update(req.json)
  res.json(settings)
}
