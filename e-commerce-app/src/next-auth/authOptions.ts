// configuration of next auth

import { error } from "console";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"; 
import {jwtDecode, JwtPayload} from "jwt-decode"

export const authOptions: NextAuthOptions = {
  providers: [
    // way to login with email & password
    Credentials({
      // button name
      name: "myLogin",

      // inputs info
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },

      // function to call api ==> when click on button
      async authorize(credentials, req) {
        // get form values
        // excute when call api
        // on success ==> return object user data
        // on error   ==> null / false / error

        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );

          const result = await res.json(); // object contains token | object error msg
          

          // if res.ok ? ===> save token ==> cookies
          if (!res.ok) {
            throw new Error(result.message || "invalid login");
          }  

          

          const jwt: {id : string} = jwtDecode(result.token) 
          

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,  
            accessToken: result.token
          };
        } catch (err) {
           
          throw new Error((err as Error).message)

        //   return null;
        }
      },
    }),
  ], 


  callbacks: {  

jwt(param) {
  // console.log("jwt param", param)

  if (param.user) {
    param.token.routeToken = param.user.accessToken;
    param.token.id = param.user.id
  }

  return param.token
},
    session({token, session})  { 



        session.id = token.id 
        // param.session.token = param.token.routeToken



        return session
    }



  } ,  


  secret: process.env.NEXTAUTH_SECRET,

  pages: {  

    signIn: "/login"

  },  


};