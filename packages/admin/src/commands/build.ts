import { build as adminBuild, clean } from "@sgftech/admin-ui"
import { resolve } from "path"
import { BuildOptions } from "../types"
import { getPluginPaths, loadConfig } from "../utils"
import { createBuildManifest } from "../utils/build-manifest"

export default async function build({
  backend,
  path,
  outDir,
  deployment,
}: BuildOptions) {
  const {
    path: configPath,
    backend: configBackend,
    outDir: configOutDir,
  } = loadConfig()

  const plugins = await getPluginPaths()
  const appDir = process.cwd()

  const outDirOption = resolve(appDir, outDir || configOutDir)
  const pathOption = deployment ? path || "/" : path || configPath
  const backendOption = deployment
    ? backend || process.env.MEDUSA_ADMIN_BACKEND_URL
    : backend || configBackend

  await clean({
    appDir: appDir,
    outDir: outDirOption,
  })

  await adminBuild({
    appDir: appDir,
    buildDir: outDirOption,
    plugins,
    options: {
      path: pathOption,
      backend: backendOption,
      outDir: outDirOption,
      /**
   * Options for the auth0 client.
   */
    auth0ClientId: process.env.MEDUSA_ADMIN_REACT_APP_AUTH0_DOMAIN,
    auth0Domain: process.env.MEDUSA_ADMIN_REACT_APP_AUTH0_CLIENT_ID
    },
  })

  await createBuildManifest(appDir, {
    outDir: outDir || configOutDir,
    path: path || configPath,
    backend: backend || configBackend,
    deployment,
  })
}
