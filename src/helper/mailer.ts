import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);

       if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000});
       }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000});
       }

       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          // add these to the env file
          user: "b6113b176caf16",
          pass: "cc99de452fad67"
      }
    });

      const mailOptions = {
        from: 'asfarwaheed01@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
        email:"Reset Your Password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}<br>
        OR <br> Copy Paste the link below in your Browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`                
      }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;  

    } catch (error:any) {
        throw new Error(error.message);
    }
} 