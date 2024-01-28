import dotenv from "dotenv"
import fse from "fs-extra"
import path from "node:path"

const MEDUSA_ADMIN = /^MEDUSA_ADMIN_/i

let ENV_FILE_NAME = ""
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production"
    break
  case "staging":
    ENV_FILE_NAME = ".env.staging"
    break
  case "test":
    ENV_FILE_NAME = ".env.test"
    break
  case "development":
  default:
    ENV_FILE_NAME = ".env"
    break
}

if (fse.existsSync(ENV_FILE_NAME)) {
  dotenv.config({ path: path.resolve(process.cwd(), ENV_FILE_NAME) })
} else if (ENV_FILE_NAME !== ".env") {
  // Fall back to .env if the specified file does not exist
  dotenv.config({ path: path.resolve(process.cwd(), ".env") })
}

type GetClientEnvArgs = {
  path?: string
  env?: string
  backend?: string
  auth0ClientId?:string
  auth0Domain?:string

}

export const getClientEnv = (args: GetClientEnvArgs) => {
  const raw = Object.keys(process.env)
    .filter((key) => MEDUSA_ADMIN.test(key))
    .reduce(
      (acc, current) => {
        acc[current] = process.env[current]

        return acc
      },
      {
        ADMIN_PATH: args.path || "/",
        NODE_ENV: args.env || "development",
        MEDUSA_BACKEND_URL: args.backend || process.env.MEDUSA_BACKEND_URL,
        MEDUSA_ADMIN_REACT_APP_AUTH0_CLIENT_ID: args.auth0ClientId ||
           process.env.MEDUSA_ADMIN_REACT_APP_AUTH0_CLIENT_ID || "XXXXXX",
        MEDUSA_ADMIN_REACT_APP_AUTH0_DOMAIN:args.auth0Domain ||
            process.env.MEDUSA_ADMIN_REACT_APP_AUTH0_DOMAIN || "http://localhost:9000"
      }
    )

  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }

  return stringified
}
