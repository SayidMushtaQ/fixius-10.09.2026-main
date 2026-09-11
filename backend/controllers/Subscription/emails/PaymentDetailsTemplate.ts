// mail configuration
export const sendBankDetailsEmail = (
  email: string,
  name: string,
  plan: any,
  paymentId: string
) => {
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME as string;
  const iban = process.env.NEXT_PUBLIC_IBAN as string;
  const swiftCode = process.env.NEXT_PUBLIC_SWIFT_CODE as string;

  return {
    from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: `${email}`,
    subject: `Bestätigung Ihrer Abonnement-Buchung`,
    html: `
      <html>
      <head>
        <style>
          body { max-width: 100%; margin-inline: auto; font-family: Arial, sans-serif; }
          h1 { color: #717171; font-size: 24px; color: #000000; margin-top: 20px; }
          p { font-size: 14px; }
          .container { max-width: 500px; margin: 0 auto; padding-top: 24px; }
          .main { margin-bottom: 20px; color: #000000; }
          .hr__line { height: 1.2px; background-color: #dddddd; margin: 40px auto 30px auto; }
          .desc { color: #000000; padding-bottom: 20px; }
          .desc1 { color: #000; padding: 20px 0 0 0; }
          .desc2 { color: #000; padding: 10px 0; }
          .footer__desc { color: #56595C; padding-bottom: 10px; }
          .footer__img { width: 96px; }
          .mid_p { margin: 0 auto 4px auto; font-size: 13px; }
          .bank-details { padding: 10px; background-color: #f9f9f9; border-radius: 6px; }
          .bank-details p { margin: 4px 0; }
          .button {
            display: inline-block;
            text-decoration: none;
            text-transform: none;
            color: #ffffff;
            font-weight: 600;
            padding: 12px 8px;
            border-radius: 6px;
            background-color: #ff6a18;
          }
          .paymentid{
           color:#C08787
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="main">
            <h1>Zahlungsanweisungen</h1>
            <p>Hallo ${name},</p>
          </div>
          <p class="desc">
          Vielen Dank für die Buchung des ${plan.duration_in_days}-Tage-Pakets auf unserem Handwerkerportal! Bitte überweisen Sie den entsprechenden Betrag auf das unten angegebene Konto und vergessen Sie nicht, die folgende Zahlungs-ID als Verwendungszweck anzugeben:</p>
          
      <p class=""><strong>Zahlungs-ID:</strong class='paymentid'> ${paymentId}</p>
      <p class=""><strong>Betrag:</strong> €${plan.price}</p>

          <div class="bank-details">
          <h2 style='magin-bottom:5px;font-size:20px'>Bankverbindung</h2>
            <p><strong>Bankname:</strong> ${bankName}</p>
            <p><strong>IBAN:</strong> ${iban}</p>
            <p><strong>BIC/SWIFT-Code:</strong> ${swiftCode}</p>
          </div>

          <p class="desc1">Sobald wir Ihre Zahlung erhalten haben, wird Ihr Abonnement automatisch aktiviert. Wenn Sie Fragen haben oder Unterstützung benötigen, zögern Sie nicht, uns zu kontaktieren.</p>
          <p class="desc">Vielen Dank für Ihre Mitarbeit!</p>

          <div class="hr__line"></div>
          <p class="footer__desc">Mit freundlichen Grüßen, <br> Das Team des Handwerkerportals</p>
        </div>
      </body>
    </html>
    `,
  };
};
