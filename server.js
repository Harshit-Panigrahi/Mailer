const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json());

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "harshit.whitehat@gmail.com",
    pass: "sdrckwcdvrbwgcgh",
  },
});

app.post("/send-mail", (req, res) => {
  const to = req.body.to;
  const name = req.body.name;
  const amnt = req.body.amnt;
  const date = req.body.date;
  
  const mailData = {
    from: "harshit.whitehat@gmail.com",
    to: to,
    subject: "Your payment is due!",
    html:
    `<p> Hello ${name}, </p>
     <p> This is a reminder email that your payment of amount ${amnt} is due on date ${date} </p>
     <p> Kindly make the payment before the due date to avoid any inconvenience. </p>
     <p> Thanks and Regards, </p>
     <p> Harshit Panigrahi </p>`,
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res
      .status(200)
      .send({ message: "Invitation sent!", message_id: info.messageId });
  });
});

server.listen(process.env.PORT || 3030);
