import JobAlert from "@/backend/models/JobAlert";
import JobPost from "@/backend/models/NewJob";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { errorResponse } from "@/backend/utils/errorHandler";
import { calculateDistanceVincenty } from "@/helper/calculateDistance";
import { transporter } from "@/helper/mailTransporter";
import { sendJobAlert } from "@/app/api/jobalert/send_alert/emailTemplate";
import { NextApiRequest, NextApiResponse } from "next";

export const sendJobAlertEmails = async (jobId: string) => {
  try {
    const job = await JobPost.findById(jobId);
    if (!job) return;

    const preferences = await JobAlert.find({
      $or: [
        { keywords: { $in: [job.category] } },
        { location: { $in: [job.location.zip_code] } },
      ],
      status: "active",
    }).populate({
      path: "userId",
      model: userDb,
    });

    const filterPreference = preferences.filter((pref: any) => {
      // Calculate the distance between the user's location and the job post's location
      const userLat = pref?.userId?.address?.coordinates?.lat;
      const userLng = pref?.userId?.address?.coordinates?.lng;

      if (!userLat || !userLng) return false;

      const jobDistance = calculateDistanceVincenty(
        userLat,
        userLng,
        job.location.coordinates[1],
        job.location.coordinates[0],
      );

      // Check if the job post is within the specified distance
      return jobDistance <= pref?.radius;
    });

    const craftsman = filterPreference.map((item: any) => {
      const userLat = item?.userId?.address?.coordinates?.lat;
      const userLng = item?.userId?.address?.coordinates?.lng;

      const jobDistance = calculateDistanceVincenty(
        userLat,
        userLng,
        job.location.coordinates[1],
        job.location.coordinates[0],
      );

      return {
        email: item?.userId?.email,
        distance: Math.round(jobDistance),
        otp: item.userId.password,
      };
    });

    // Function to send emails
    const sendEmails = async (items: any[]) => {
      try {
        const promises = items.map((item) => {
          return transporter.sendMail(
            sendJobAlert(item.email, job, item.distance, item.otp),
          );
        });
        await Promise.all(promises);
        console.log("Correos electrónicos enviados correctamente");
      } catch (error) {
        console.error("Error al enviar correos electrónicos:", error);
      }
    };

    // Deduplicate craftsman based on email
    const uniqueCraftsman = craftsman.filter(
      (item: any, index: number, self: any[]) =>
        index === self.findIndex((t) => t.email === item.email),
    );

    // Call the function to send emails
    await sendEmails(uniqueCraftsman);
  } catch (error) {
    console.error("Error in sendJobAlertEmails:", error);
  }
};

export const findMatchingJobsAndSendEmail = async (
  req: any,
) => {
  try {
    let body;
    if (typeof req.json === 'function') {
      body = await req.json();
    } else {
      body = req.body;
    }
    const jobId = body?.newJob?._id;
    await sendJobAlertEmails(jobId);
    return new Response(JSON.stringify({ message: "Emails sent successfully" }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error", error: error.message }), { status: 500 });
  }
};
