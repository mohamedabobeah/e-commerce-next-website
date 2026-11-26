// route handler  ====> method, api endpoint, data   

import {NextRequest, NextResponse} from "next/server"


export function GET(req : NextRequest )  {













    return NextResponse.json({
        message : "success", 
        countOfUers : 5, 
        users : [
            {id: 10, userName:"ali", age: 30},  
             {id: 11, userName:"kareem", age: 20},  
              {id: 12, userName:"zeyad", age: 40},   
              {id: 13, userName:"mona", age: 50},   
              {id: 14, userName:"hossam", age: 60}, 
        ]
    })
}