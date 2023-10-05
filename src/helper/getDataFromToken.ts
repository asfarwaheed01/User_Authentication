import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) =>{
    try {
        const token = request.cookies.get("token")?.value || ""; //Encoded at the moment 
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!); //Decoding
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}