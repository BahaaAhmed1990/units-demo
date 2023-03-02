const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = (req, res) => {
  const { firstName, lastName, email, phone, unitCode } = req.body;
  console.log(firstName, lastName, email, phone, unitCode);

  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let message = {
    from: process.env.EMAIL,
    to: "ag513174.bahaa@gmail.com",
    subject: "Place Order",
    html: `<b>Hello world?</b><br />
    ${firstName}<br/>
    ${lastName}<br/>
    ${phone}<br/>
    ${email}<br/>
    ${unitCode}<br/>
    `,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = { sendMail };
