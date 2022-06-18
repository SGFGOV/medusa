import { ConfigModule } from "../types/global"
import { getConfigFile } from "medusa-core-utils/dist"

const isProduction = ["production", "prod"].includes(process.env.NODE_ENV || "")

const errorHandler = isProduction
  ? (msg: string): never => {
      throw new Error(msg)
    }
  : console.log

export default async (rootDirectory: string): Promise<ConfigModule> => {
  /** we promisify the configuration to support both synchronouse and asynchronous loading.  */

  const configuration = getConfigFile(rootDirectory, `medusa-config`)
  const resolveConfigProperties = async (obj): Promise<ConfigModule> => {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        await resolveConfigProperties(obj[key])
      }
      if (typeof obj[key] === "function") {
        obj[key] = await obj[key]()
      }
    }
    return obj
  }
  const configModule = await resolveConfigProperties(configuration)

  if (!configModule?.projectConfig?.redis_url) {
    console.log(
      `[medusa-config] ⚠️ redis_url not found. A fake redis instance will be used.`
    )
  }

  const jwt_secret =
    configModule?.projectConfig?.jwt_secret ?? process.env.JWT_SECRET
  if (!jwt_secret) {
    errorHandler(
      `[medusa-config] ⚠️ jwt_secret not found.${
        isProduction
          ? ""
          : " fallback to either cookie_secret or default 'supersecret'."
      }`
    )
  }

  const cookie_secret =
    configModule?.projectConfig?.cookie_secret ?? process.env.COOKIE_SECRET
  if (!cookie_secret) {
    errorHandler(
      `[medusa-config] ⚠️ cookie_secret not found.${
        isProduction
          ? ""
          : " fallback to either cookie_secret or default 'supersecret'."
      }`
    )
  }

  if (!configModule?.projectConfig?.database_type) {
    console.log(
      `[medusa-config] ⚠️ database_type not found. fallback to default sqlite.`
    )
  }

  return {
    projectConfig: {
      jwt_secret: jwt_secret ?? "supersecret",
      cookie_secret: cookie_secret ?? "supersecret",
      ...configModule?.projectConfig,
    },
    plugins: configModule?.plugins ?? [],
  }
}
