import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 587, // Use 587 for TLS
    secure: false, // Set to false for STARTTLS (port 587)
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL, // Your Namecheap email
      pass: process.env.NEXT_PUBLIC_PASS, // Your email password
    },
  });


const sendEmail = async () => {
  try {
    const email = "fixius@outlook.com";
    const emailOptions = {
      from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
      to: `${email}`,
      subject: "Your password recently changed!",
      html: "<p class='desc'>Thank you for choosing Handyman.</p>",
    };
    const response = await transporter.sendMail(emailOptions);
    console.log(response);
  } catch (error) {
    console.log("error", error);
  }
};

sendEmail();