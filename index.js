const express = require("express");
const { status } = require("express/lib/response");
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Hello from server!!!");
})

app.post("/email", (req, res) => {
    const { from, to, subject, text, html } = req.body;
    console.log(JSON.parse(to))
    try {
        let mailOptions = {
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        };

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jedlester42@gmail.com', // generated ethereal user
                pass: 'ictrrbsgynuhhzrf'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.status(201).json({ success: true });
    } catch (error) {
        res.status(501).json(error, { success: false });
    }
})

app.listen(process.env.PORT || 80);