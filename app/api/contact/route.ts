import { connectDb } from "@/backend/middleware/db";
import { transporter } from "@/helper/mailTransporter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const { name, email, subject, message } = payload;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Alle Felder sind erforderlich." }, { status: 400 });
    }

    const mailOptions = {
      from: `'Fixius Kontakt'<${process.env.NEXT_PUBLIC_EMAIL}>`,
      to: process.env.NEXT_PUBLIC_EMAIL, // Send to admin
      replyTo: email,
      subject: `Kontaktanfrage: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF5A1F;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Betreff:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nachricht:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Nachricht erfolgreich gesendet!" }, { status: 200 });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ message: "Fehler beim Senden der Nachricht." }, { status: 500 });
  }
}
