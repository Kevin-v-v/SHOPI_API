const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const {google} = require('googleapis')
const viewPath =  path.resolve(__dirname, '../templates/views/');
const partialsPath = path.resolve(__dirname, '../templates/partials');
const {getToken} = require('../config/jwt.config');



module.exports = async (req,res) => {
    
    const oAuth2Client = new google.auth.OAuth2(
        process.env.MAIL_ID_CLIENTE,
        process.env.MAIL_SECRET,
        'https://developers.google.com/oauthplayground'
    )
    
    oAuth2Client.setCredentials({refresh_token: process.env.MAIL_REFRESH_TOKEN});

    try{
        const accessToken = await oAuth2Client.getAccessToken();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.MAIL_ID_CLIENTE,
                clientSecret: process.env.MAIL_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        // transporter.verify(function (error, success) {
        //     if (error) {
        //     console.log(error);
        //     } else {
        //     console.log(success);
        //     }
        // });
        console.log("id " + req.query.id);
        const token = getToken({email: req.query.email, code: req.query.id});
        var mailOptions = {
            from: process.env.MAIL_USER,
            to: req.query.email,
            subject: 'Verifica tu correo electrónico, SHOPI',
            template: 'index',
            context: {
                url: `http://${process.env.HOST}:${process.env.PORT}/verify/${token}`,
                name: req.query.name
            }
                
        };

        

        transporter.use('compile', hbs({
            viewEngine: {
            extName: '.handlebars',
            layoutsDir: viewPath,
            defaultLayout: false,
            partialsDir: partialsPath
            },
            viewPath: viewPath,
            extName: '.handlebars',
        }));

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log("[Registration] " + error);
            res.json({
                success: false,
                msg: "Error al enviar el correo"
            });
            } else {
            console.log('Email sent: ' + info.response);
            res.json({
                success: true,
                msg: "Correo enviado"
            });
            }
        });
    }catch(error){
        console.log(error);
        res.json({success: false, msg: "Error al enviar el correo"});
    }
}

 