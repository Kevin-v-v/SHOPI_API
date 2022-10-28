const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const {google} = require('googleapis')
const viewPath =  path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');
const creds = require('./credentials.json');



module.exports = async (req,res) => {
    
    const oAuth2Client = new google.auth.OAuth2(
        creds.ID_CLIENTE,
        creds.SECRET,
        'https://developers.google.com/oauthplayground'
    )
    
    oAuth2Client.setCredentials({refresh_token: creds.REFRESH_TOKEN});

    try{
        const accessToken = await oAuth2Client.getAccessToken();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: creds.USER,
                clientId: creds.ID_CLIENTE,
                clientSecret: creds.SECRET,
                refreshToken: creds.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        transporter.verify(function (error, success) {
            if (error) {
            console.log(error);
            } else {
            console.log(success);
            }
        });

        var mailOptions = {
            from: creds.USER,
            to: req.query.email,
            subject: 'Verifica tu correo electrónico, SHOPI',
            template: 'index',
            context: {
                url: 'google.com',
                name: req.query.name
            }
                
        };

        //following function has to call inside the sendMail 

        transporter.use('compile', hbs({
            viewEngine: {
            //extension name
            extName: '.handlebars',
            // layout path declare
            layoutsDir: viewPath,
            defaultLayout: false,
            //partials directory path
            partialsDir: partialsPath
            },
            //View path declare
            viewPath: viewPath,
            extName: '.handlebars',
        }));

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            res.json(error)
            } else {
            console.log('Email sent: ' + info.response);
            res.json({success: true});
            }
        });
    }catch(error){
        console.log(error);
        res.json(error);
    }
}

 