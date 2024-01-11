const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "testtoolon07@gmail.com",
    pass: "lhh",
  },
});

const mailOptions = {
  from: "testtoolon07@gmail.com",
  to: "testtoolon07@gmail.com",
  //to:"narendracharan25753@gmail.com",
  subject: "Hey this is test mail",
  text: "hye this is body part",
};

module.exports = {
  transporter,
  mailOptions,
};
