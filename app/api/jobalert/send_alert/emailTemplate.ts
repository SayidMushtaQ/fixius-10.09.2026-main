export const sendJobAlert = (
  email: string,
  data: any,
  distance: any,
  otp: any,
  baseUrl: string = process.env.BASE_URL as string
) => ({
  from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
  to: `${email}`,
  subject: `Neuer Jobalarm!`,
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
                  <p>Neuer Job veröffentlicht!</p>
                </div>
            
                <p style="color:orange;margin-bottom:3px">${data.category}</p>
                <p class="desc">${data?.serviceTitle?.service_title}</p>
                <p class="desc">Geschätzte Entfernung: ${distance} km</p>
                <a
                  href="${baseUrl}/newjob/${data._id}"
                  style="text-decoration: none; text-transform: none; color: rgb(255, 255, 255); font-weight: 600; padding: 12px 8px; border-radius: 6px; background-color: rgba(255, 106, 24, 1);"
                >Ansehen</a>
    
                <a
                href="${baseUrl}/api/jobalert/unsubscribe?otp=${otp}&email=${email}"
                style="text-decoration: underline;color:red;margin-left:10px"
              >Abbestellen</a>
        
                <div class="hr__line"></div>
                <p class="footer__desc">Mit freundlichen Grüßen, <br> Das Team des Handwerker-Portals</p>
            </body>
          </html>
                  `,
});
