require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = function (to, from, subject, text) {
    const msgBody = { to, from, subject, html:text }
    sgMail.send(msgBody, (err, res) => {
        if (err) {
            console.log('Email not sent, error occured', err);
        } else {
            console.log('Email sent!')
        }
    })
};

module.exports = sendEmail;