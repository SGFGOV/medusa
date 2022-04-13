import { Router } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { getConfigFile } from "medusa-core-utils"

import middlewares from "../middleware"

const route = Router()

export default (app, rootDirectory) => {
  app.use("/invoice", route)

  const { configModule } = getConfigFile(rootDirectory, "medusa-config")
  const { projectConfig } = configModule

  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  }

  route.options("/orders/:invoice_id", cors(corsOptions))
  route.post(
    "/orders/:invoice_id",
    cors(corsOptions),
    bodyParser.json(),
    middlewares.wrap(require("./add-email").default)
  )
  return app
}
