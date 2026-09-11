import { connectDb } from "@/backend/middleware/db";
import Subscription from "@/backend/models/Subscription";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { transporter } from "@/helper/mailTransporter";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const template = ({ plan, name, lastName, end_date }: any) => {
  return `
  <html>
    <head>
      <style>
        body { max-width: 100%; margin-inline: auto; } h1 { color: #717171;
        font-size: 24px; color: #000000; margin-top: 20px;} p { font-size: 14px;}
        .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } .main
        {margin-bottom: 20px; color: #000000;} .hr__line{ height: 1.2px;
        background-color: #dddddd; margin: 40px auto 30px auto; } .desc { color:
        #000000; padding-bottom: 10px;} .desc1 {color: #000; padding-bottom:10px;} .desc2{color:#000; padding: 10px 0} .footer__desc { color: #56595C;
        padding-bottom: 10px;} .footer__img{ width: 96px; } .mid_p { margin: 0
        auto 4px auto; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="main">
          <p>Dear \${name}</p>
        </div>

        <p class="desc">We hope this email finds you well. We are informing you that your subscription to <b>\${
          plan.name
        }</b> has been expired, on \${format(new Date(end_date), "MM/dd/yyyy")}.</p>

        <p class="desc1">We appreciate your continued trust in our services, and we want to ensure that you experience no interruption. To maintain uninterrupted access, please renew your subscription.we are waiting to connect with you again</p>
     
        <p class="desc">You can easily renew your subscription by visiting <a href="\${
          process.env.BASE_URL
        }/dashboard/handwerker/abonnementverwaltung">this link</a> or contacting our support team at support@handyman.com</p>

        <p class="desc">Thank you for being a valued member of our community. We look forward to continuing to serve you.</p>

        <div class="hr__line"></div>
        <p class="footer__desc">Best regards, </br> Handyman Service Portal Team</p>
    </body>
  </html>`;
};

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const authHeader = req.headers.get("authorization");
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const futureDate = new Date();
    const subscription = await Subscription.aggregate([
      {
        $match: {
          status: "active",
          end_date: { $lte: futureDate },
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "plan",
        },
      },
      { $unwind: "$plan" },
      {
        $lookup: {
          from: "craftsmen",
          localField: "craftsmanId",
          foreignField: "_id",
          as: "craftsman",
        },
      },
      { $unwind: "$craftsman" },
      {
        $lookup: {
          from: "userdbs",
          localField: "craftsman.user",
          foreignField: "_id",
          as: "craftsman.user",
        },
      },
      { $unwind: "$craftsman.user" },
      {
        $project: {
          _id: 1,
          status: 1,
          start_date: 1,
          end_date: 1,
          plan: 1,
          username: "$craftsman.username",
          email: "$craftsman.user.email",
          last_name: "$craftsman.user.lastName",
          name: "$craftsman.user.name",
        },
      },
    ]);

    if (subscription.length > 0) {
      const emailPromises = subscription.map(async (i: any) => {
        try {
          console.log(`Attempting to send email to: ${i?.email}`);
          await transporter.sendMail({
            from: "Handyman<info@fixius.es>",
            to: `${i?.email}`,
            subject: `Handyman Subscription has expired.`,
            html: template(i),
          });
          console.log(`Email successfully sent to: ${i?.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${i?.email}:`, error);
        }
      });

      try {
        const filter = { _id: { $in: subscription.map((i: any) => i._id) } };
        const update = { $set: { status: "expired" } };
        await Subscription.updateMany(filter, update);
        await Promise.all(emailPromises);
        return NextResponse.json(subscription, { status: 200 });
      } catch (error) {
        console.error("Error sending some emails:", error);
        return NextResponse.json({ error: "Error sending some emails" }, { status: 500 });
      }
    } else {
      console.log("No subscriptions to process.");
      return NextResponse.json({ message: "No subscriptions to process." }, { status: 200 });
    }
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
