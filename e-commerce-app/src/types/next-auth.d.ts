import NextAuth from "next-auth"
import { string } from "zod";

declare module "next-auth" {  

    interface User  {


        id: string; 
        name: string; 
        email: string; 
        accessToken: string;
    }
 
  interface Session {
    user: {
      name: string; 
      email: string; 
      image? : string | undefined;
  }; 

  expires: string; 
  id: string;
} 

} 



import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string 
    routeToken: string
  }
}