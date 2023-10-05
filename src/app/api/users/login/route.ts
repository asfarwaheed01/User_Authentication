import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        
        // check isuser exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User Does Not exist"}, {status:400})
        }
        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"}, {status:400})
        }
        // Create Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }
        // create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"Login Successful",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true})
        return response;
    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500})
    }
}