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
    from: `"ESUC ClubFinder" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your ClubFinder Reset Code: ${code}`,
    text: [
      `Hi there,`,
      ``,
      `Your password reset code is: ${code}`,
      ``,
      `This code expires in 10 minutes. If you didn't request a password reset, you can safely ignore this email.`,
      ``,
      `— ESUC ClubFinder Team`,
    ].join("\n"),
  });
}

async function sendContactEmail(payload) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email service not configured.");
  }

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
  const safeSubject = subject && String(subject).trim().length > 0
    ? `[ClubFinder] ${subject.trim()}`
    : `[ClubFinder] Message from ${displayName}`;

  const lines = [
    `--- ClubFinder Contact Form ---`,
    ``,
    `From: ${displayName}`,
    `Email: ${email || "N/A"}`,
    clubName ? `Club: ${clubName}` : null,
    ``,
    `Message:`,
    message || "(no message provided)",
    ``,
    `---`,
    `Reply directly to this email to respond to ${email || "the sender"}.`,
  ].filter((line) => line !== null);

  await transporter.sendMail({
    from: `"ClubFinder - ${displayName}" <${process.env.EMAIL_USER}>`,
    to: "esuc.ucla.webmaster@gmail.com",
    replyTo: email || undefined,
    subject: safeSubject,
    text: lines.join("\n"),
  });
}

module.exports = { sendResetCodeEmail, sendContactEmail };
