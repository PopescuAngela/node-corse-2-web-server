const nodemailer = require('nodemailer');
const emailLogger = require('../util/currentEmailLogger');

var sendMail = (fromEmail, fromPassword, toEmail, subject, message, callback) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.itsix.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: fromEmail, // generated ethereal user
                pass: fromPassword // generated ethereal password
            }
        });

        let mailOptions = {
            from: fromEmail, // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: message // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                emailLogger.logExceptionToCurrentEmailHistory(`Could not send email to ${toEmail}, exception: ${error}`);
                callback('Error');
            } else {
                emailLogger.logToCurrentEmailHistory(mailOptions.from, mailOptions.to, mailOptions.subject, mailOptions.text);
                callback(undefined, {

                });
            }
        });
}

module.exports = {
    sendMail
}