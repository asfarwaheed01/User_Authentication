import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            // Return a 400 Bad Request response for duplicate email
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // hash/encrypt password
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        // save user in the database
        const newUser = new User({
            username,
            email,
            password: hashedpassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification Email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        // Return a 200 OK response with the user data on success
        return NextResponse.json({ message: "user created successfully", success: true, savedUser });
    } catch (error: any) {
        // Log the error and return a 500 Internal Server Error response
        console.error("Error in sign-up:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

connect();
