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

async function sendContactEmail(payload) {
  const {
    firstName = "",
    lastName = "",
    email = "",
    subject = "",
    clubName = "",
    message = "",
  } = payload || {};

  const transporter = makeTransporter();

  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim() || "Unknown sender";
  const safeSubject = subject && String(subject).trim().length > 0 ? subject.trim() : "New ClubFinder contact form submission";

  const lines = [
    `From: ${displayName}`,
    `Email: ${email || "N/A"}`,
    clubName ? `Club Name: ${clubName}` : null,
    "",
    "Message:",
    message || "(no message provided)",
  ].filter((line) => line !== null);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "esuc.ucla.webmaster@gmail.com",
    replyTo: email || undefined,
    subject: safeSubject,
    text: lines.join("\n"),
  });
}

module.exports = { sendResetCodeEmail, sendContactEmail };
