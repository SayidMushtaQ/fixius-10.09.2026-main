export const sendMailSailerOption = (
	email: string,
	password: string,
	baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL as string
) => {
	const cleanBaseUrl = baseUrl.replace(/\/$/, "");
	return {
		from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
		to: `${email}`,
		subject: `Bestätigung und Anmeldedaten für Ihr Fixius-Konto`,
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
                  <p>Herzlichen Glückwunsch!</p>
                </div>
                <p class="desc">Vielen Dank für Ihre Registrierung bei Fixius. Um Ihr Konto zu aktivieren und Ihre Auftragsanzeige zu verwalten, klicken Sie bitte auf den folgenden Aktivierungslink:</p>
            
                <a
                  href="${cleanBaseUrl}/api/verify_email/?email=${email}&id=${password}&client=true"
                  style="display: inline-block; text-decoration: none; color: rgb(255, 255, 255); font-weight: 600; padding: 12px 24px; border-radius: 6px; background-color: rgba(255, 106, 24, 1); text-align: center;"
                >Konto aktivieren</a>
...
                <p class="desc1">Nach der Aktivierung können Sie sich mit den folgenden Zugangsdaten anmelden:</p>
                </br>
                <p class="">E-Mail-Adresse: ${email}</p>
                <p class="">Passwort: ${password}</p>
                </br> </br>
                <p class="desc">Bitte bewahren Sie Ihre Anmeldedaten sicher auf und teilen Sie sie nicht mit Dritten. Nach der Aktivierung können Sie Ihre Auftragsanzeige im Kunden-Bereich verwalten.</p>
...
                <p class="desc">Vielen Dank für Ihr Vertrauen!</p>
...
                <p class="footer__desc">Mit freundlichen Grüßen, <br> Ihr Fixius Team</p>
            </body>
          </html>
                  `,
	};
};
