// mail configuration
export const sendUnsubscriptionConfirmation = (
    email: string,
    baseUrl: string = process.env.BASE_URL as string
  ) => ({
    from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: `${email}`,
    subject: `Job Alert Unsubscription Confirmation`,
    html: `
      <html>
      <head>
        <style>
          body { max-width: 100%; margin-inline: auto; } 
          h1 { color: #717171; font-size: 24px; color: #000000; margin-top: 20px; } 
          p { font-size: 14px; } 
          .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } 
          .main { margin-bottom: 20px; color: #000000; } 
          .hr__line { height: 1.2px; background-color: #dddddd; margin: 40px auto 30px auto; } 
          .footer__desc { color: #56595C; padding-bottom: 10px; } 
          .footer__img { width: 96px; } 
          .mid_p { margin: 0 auto 4px auto; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="main">
            <h1>Job Alert Unsubscription Confirmation</h1>
            <p>You have successfully unsubscribed from job alerts. You will no longer receive job alert notifications via email.</p>
            <p>If you change your mind and wish to re-subscribe to job alerts, you can do so by visiting your account settings on our website.</p>
            <p>Thank you for using our service!</p>
          </div>
          
          <div class="hr__line"></div>
          <p class="footer__desc">Best regards, </br> Handyman Service Portal Team</p>
        </div>
      </body>
      </html>
    `,
  });
