export const sendMailSailerOptionForCraftman = (
  email: string,
  password: string,
  craftsmanId: string,
  baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL as string
) => {
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  return {
    from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: `${email}`,
    subject: `Bestätigung und Anmeldedaten für Ihr Fixius Handwerker-Profil`,
    html: `<html>
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
                  <p>Herzlichen Glückwunsch!</p>
                </div>
                <p class="desc">Vielen Dank für Ihre Registrierung als Handwerker bei Fixius. Um Ihr Konto zu aktivieren und alle Funktionen nutzen zu können, klicken Sie bitte auf den folgenden Link:</p>
            
                <a
                  href="${cleanBaseUrl}/api/verify_email/?email=${email}&id=${password}&handyman=true&craftsmanId=${craftsmanId}"
                  style="display: inline-block; text-decoration: none; color: rgb(255, 255, 255); font-weight: 600; padding: 12px 24px; border-radius: 6px; background-color: rgba(255, 106, 24, 1); text-align: center;"
                >Profil aktivieren</a>
...
                <p class="desc1">Nach der Aktivierung können Sie sich mit den folgenden Zugangsdaten anmelden:</p>
                </br>
                <p class="">E-Mail-Adresse: ${email}</p>
                <p class="">Passwort: ${password}</p>
                </br> </br>
                <p class="desc">Bitte bewahren Sie Ihre Zugangsdaten sicher auf und geben Sie sie nicht an Dritte weiter. Nach der Aktivierung können Sie sich im Handwerker-Portal anmelden.</p>
...
                <p class="desc">Vielen Dank für Ihr Vertrauen!</p>
...
                <div class="hr__line"></div>
                <p class="footer__desc">Mit freundlichen Grüßen, <br> Ihr Fixius Team</p>
            </body>
          </html>`,
  };
};
