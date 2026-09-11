export const sendChangePassMail = (
	user: any,
	baseUrl: string = process.env.BASE_URL as string
) => ({
	from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
	to: `${user.email}`,
	subject: `Bestätigung: Passwort erfolgreich geändert`,
	html: `
            <html>
            <head>
              <style>
                body { max-width: 100%; margin-inline: auto; } 
                h1 { font-size: 24px; color: #000000; margin-top: 20px;} 
                p { font-size: 14px;} 
                .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } 
                .main {margin-bottom: 20px; color: #000000;} 
                .hr__line{ height: 1.2px; background-color: #dddddd; margin: 40px auto 30px auto; } 
                .desc { color: #000000; padding-bottom: 20px;} 
                .desc1 {color: #000; padding:20px 0 0 0} 
                .desc2{color:#000; padding: 10px 0} 
                .footer__desc { color: #56595C; padding-bottom: 10px;} 
                .footer__img{ width: 96px; } 
                .mid_p { margin: 0 auto 4px auto; font-size: 13px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="main">
                  <p>Sehr geehrte/r ${user.name},</p>
                </div>
                <p class="desc">Ihr Passwort wurde erfolgreich geändert. Bitte bestätigen Sie diese Änderung, indem Sie auf den folgenden Link klicken:</p>
            
                <a
                  href="${baseUrl}/dashboard/${user.role}"
                  style="display: inline-block; text-decoration: none; color: rgb(255, 255, 255); font-weight: 600; padding: 12px 24px; border-radius: 6px; background-color: rgba(255, 106, 24, 1); text-align: center;"
                >Zum Dashboard</a>

                <p class="desc1">Wenn Sie Fragen haben oder Unterstützung benötigen, stehen wir Ihnen jederzeit zur Verfügung.</p>
                </br>

                <div class="hr__line"></div>
                <p class="footer__desc">Mit freundlichen Grüßen, <br> Das Team vom Handwerker-Portal</p>
            </body>
          </html>
                  `,
});
