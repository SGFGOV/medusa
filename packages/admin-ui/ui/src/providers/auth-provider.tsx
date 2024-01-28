import { PropsWithChildren } from "react"
import { AUTH0_DOMAIN,AUTH0_CLIENT_ID } from "../constants/auth"
import { Auth0Provider } from "@auth0/auth0-react";


export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} 
    clientId={AUTH0_CLIENT_ID}
>{children}</Auth0Provider>


  )
}
