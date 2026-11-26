"use server"
import { LoginType, RegisterSchemaType } from "@/Schemas/auth.schema";
import { cookies } from "next/headers";


    // call api  
   

export async function UserRegister(data : RegisterSchemaType)  {


     
    try { 

      const res = await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method : "POST", 
        body: JSON.stringify(data) ,
        headers: {"content-type" : "application/json"},
      }) 
      
      const result = await res.json();  
      console.log("result", result)  

      return res.ok


      


      if (res.ok) {

      }  

      else {

      }

    }  

    catch(err) {

    }
  
}  


















export async function UserLogin(data : LoginType)  {


     
    try { 

      const res = await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
        method : "POST", 
        body: JSON.stringify(data) ,
        headers: {"content-type" : "application/json"},
      }) 
      
      const result = await res.json();  
      console.log("result of login", result)    

      // cookies   

      // if result is ok ==> save token ==> cookies  

      if (res.ok)  {  

        
      const cookie = await cookies(); 
      cookie.set("userToken", result.token, {
        httpOnly: true,           // i can use token only using http request  
        // secure: true,  
        // maxAge: 60 * 60 * 24 
        // expires: new Date()
      })
      

      } 

      return res.ok



      


      if (res.ok) {

      }  

      else {

      }

    }  

    catch(err) {

    }
  
}