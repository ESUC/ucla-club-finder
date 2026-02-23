const nodemailer = require("nodemailer");

function makeTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });
}


async function sendResetCodeEmail(toEmail, code) {
  const transporter = makeTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "CLUB FINDER RESET CODE",
    text: `Your password reset code is: ${code}\nThis code expires in 10 minutes.`,
  });
}

module.exports = { sendResetCodeEmail };
