export const sendPaymentReceivedEmail = (
  email: string,
  name: string,
  plan: any,
  startDate: string,
  endDate: string
) => {
  return {
    from: `'Fixius' <${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: `${email}`,
    subject: `Ihr Abonnement ist jetzt aktiv!`,
    html: `
      <html>
      <head>
        <style>
          body {
            max-width: 100%;
            margin-inline: auto;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 24px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
          }
          .header h1 {
            font-size: 24px;
            color: #333333;
          }
          .content {
            color: #555555;
          }
          .content h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 8px;
          }
          .content p {
            font-size: 14px;
            margin-bottom: 16px;
          }
          .footer {
            text-align: center;
            margin-top: 24px;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Abonnement Aktiviert</h1>
          </div>
          <div class="content">
            <p>Hallo ${name},</p>
            <p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Zahlung erfolgreich eingegangen ist und Ihr Abonnement für den folgenden Plan aktiviert wurde:</p>
            <h2>Abonnement-Details</h2>
            <p><strong>Plan-Name:</strong> ${plan.name}</p>
            <p><strong>Dauer:</strong> ${plan.duration_in_days} Tage</p>
            <p><strong>Startdatum:</strong> ${new Date(
              startDate
            ).toLocaleDateString()}</p>
            <p><strong>Enddatum:</strong> ${new Date(
              endDate
            ).toLocaleDateString()}</p>
            <p>Vielen Dank, dass Sie unseren Service gewählt haben! Wenn Sie Fragen haben oder weitere Unterstützung benötigen, zögern Sie nicht, uns zu kontaktieren.</p>
            <p>Mit freundlichen Grüßen,</p>
            <p>Das Team des Handwerkerportals</p>
          </div>
          <div class="footer">
            <p>© 2024 Handyman Service Portal. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </body>
    </html>
    `,
  };
};
