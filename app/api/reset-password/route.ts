import { connectDb } from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { transporter } from "@/helper/mailTransporter";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const { email, oldPassword, newPassword } = payload;

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 character" }, { status: 400 });
    }

    const findCriteria = { email };
    const userDetails = await userDb.findOne(findCriteria);

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const matchPassword = await bcrypt.compare(oldPassword, userDetails.password);
    const matchOtp = userDetails.otp ? await bcrypt.compare(oldPassword, userDetails.otp) : false;

    if (matchPassword || matchOtp) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      await userDb.updateOne(findCriteria, {
        password: newHashedPassword,
      });

      let sendMailSailerOption = {
        from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
        to: `${email}`,
        subject: `Your password recently changed!`,
        html: `
              <html>
              <head>
                <style>
                  body { max-width: 100%; margin-inline: auto; } h1 { color: #717171;
                  font-size: 24px; color: #000000; margin-top: 20px;} p { font-size: 14px;}
                  .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } .main
                  {margin-bottom: 20px; color: #000000;} .hr__line{ height: 1.2px;
                  background-color: #dddddd; margin: 40px auto 30px auto; } .desc { color:
                  #000000; padding-bottom: 20px;} .desc1 {color: #000; padding:20px 0 0 0} .desc2{color:#000; padding: 10px 0} .footer__desc { color: #56595C;
                  padding-bottom: 10px;} .footer__img{ width: 96px; } .mid_p { margin: 0
                  auto 4px auto; font-size: 13px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="main">
                    <h1>Your password get reset.</p>
                  </div>
                  <p class="desc">Thank you for choosing Handyman.</p>
                  <p class="desc">This email is send because your password changed now.</p>

                  <p class="desc1">Your login credentials:</p>

                  <p class="desc2">Email: ${email}</p>
                  <p class="desc2">Password: ${newPassword}</p>
            
                  <div class="hr__line"></div>
                  <p class="footer__desc">Our service team is at your disposal if you have any questions! </br> You can call us Monday to Friday from 8 a.m to 5 p.m. </br> +49 123 456789 </br> Best regards, </br> Handyman Team</p>
              </body>
            </html>
                    `,
      };
      await transporter.sendMail(sendMailSailerOption);

      return NextResponse.json({ message: "Contraseña actualizada correctamente" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "¡No autorizado!La contraseña no coincidió" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
