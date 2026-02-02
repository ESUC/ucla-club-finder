const express = require("express")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const User = require("../models/userModel")

const { sendResetCodeEmail } = require("../services/mailer");
const { validatePassword } = require("../services/validatePassword");

const router = express.Router()

function generate6DigitCode() {
    return String(crypto.randomInt(100000, 1000000)); // always 6 digits
}


function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

router.post("/auth/forgot-password", async (req, res) => {
    console.log("FORGOT-PASSWORD HIT ✅", req.body);
    try {
        const { email } = req.body;

        const errors = {};

        // 1) Empty
        if (!email || String(email).trim() === "") {
            errors.email = "Please enter an email.";
        }

        // 2) Invalid email format
        if (!errors.email && !isValidEmail(email)) {
            errors.email = "Please enter a valid email address.";
        }

        // stop early if email issues
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // 3) Must exist in DB (normalize email like login)
        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ errors: { email: "No account found with that email." } });
        }

        // 4) 60 second lock since last send
        if (user.passwordResetLastSentAt) {
            const msSinceLast = Date.now() - user.passwordResetLastSentAt.getTime();
            if (msSinceLast < 60_000) {
                const secondsLeft = Math.ceil((60_000 - msSinceLast) / 1000);
                return res.status(429).json({
                    errors: { email: `Please wait ${secondsLeft} seconds before requesting another code.` },
                });
            }
        }

        // 5) Generate hash and store it
        const code = generate6DigitCode();
        const codeHash = await bcrypt.hash(code, 10);

        user.passwordResetCodeHash = codeHash;
        user.passwordResetExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        user.passwordResetVerified = false;
        user.passwordResetLastSentAt = new Date();
        await user.save();

        // 6) Send email (or log code if email not configured – for development)
        const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;
        if (hasEmailConfig) {
            try {
                await sendResetCodeEmail(email, code);
            } catch (mailErr) {
                console.error("FORGOT PASSWORD: failed to send email", mailErr.message);
                return res.status(500).json({ errors: { general: "Could not send email. Try again later or contact support." } });
            }
        } else {
            console.log("FORGOT PASSWORD (no email config): reset code for", email, "->", code);
        }

        return res.sendStatus(200);
    } catch (err) {
        console.error("FORGOT PASSWORD ERROR:", err);
        return res.status(500).json({ errors: { general: "Server error. Please try again." } });
    }
});

router.post("/auth/verify-code", async (req, res) => {
    try {
        const { email, code } = req.body;

        const errors = {};

        // email missing
        if (!email || String(email).trim() === "") {
            errors.email = "Unable to detect user. Please restart the reset process.";
        }

        // email invalid format
        if (!errors.email && !isValidEmail(email)) {
            errors.email = "Unable to detect user. Please restart the reset process.";
        }

        // code missing
        if (!code || String(code).trim() === "") {
            errors.code = "Please enter a code";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                errors: { email: "Cannot detect user. Please return to beginning" },
            });
        }

        if (!user.passwordResetCodeHash || !user.passwordResetExpiresAt) {
            return res.status(400).json({
                errors: { code: "No reset code was requested. Please request a new code." },
            });
        }

        if (user.passwordResetExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({
                errors: { code: "Reset code expired. Please request another." },
            });
        }

        const codeCheck = await bcrypt.compare(String(code), user.passwordResetCodeHash);
        if (!codeCheck) {
            return res.status(400).json({ errors: { code: "Invalid code." } });
        }

        user.passwordResetVerified = true;
        await user.save();

        return res.sendStatus(200);
    } catch (err) {
        console.error("VERIFY RESET CODE ERROR:", err);
        return res.status(500).json({ error: "Server error" });
    }
});


router.post("/auth/reset-password", async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        const errors = {};

        // Email missing (can't detect user)
        if (!email || String(email).trim() === "") {
            errors.email = "Unable to detect user email. Please restart the reset process.";
        }

        // Password fields missing
        if (!password || String(password).trim() === "") {
            errors.password = "Please enter a new password.";
        }
        if (!confirmPassword || String(confirmPassword).trim() === "") {
            errors.confirmPassword = "Please confirm your new password.";
        }

        // If missing fields, stop early
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Passwords must match
        if (password !== confirmPassword) {
            return res.status(400).json({ errors: { confirmPassword: "Passwords do not match." } });
        }

        // Use SAME password rules as register
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            return res.status(400).json({
                errors: { password: passwordErrors.join(" ") },
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: { email: "No account found with that email." } });
        }

        // Must have verified reset code already
        if (!user.passwordResetVerified) {
            return res.status(400).json({ errors: { code: "Reset code not verified." } });
        }

        // Must not be expired
        if (!user.passwordResetExpiresAt || user.passwordResetExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({
                errors: { code: "Reset session expired. Please request a new code." },
            });
        }

        // Hash + save new password
        console.log("BEFORE save password hash:", user.password);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;


        // Clear reset fields
        user.passwordResetCodeHash = null;
        user.passwordResetExpiresAt = null;
        user.passwordResetVerified = false;
        user.passwordResetLastSentAt = null;

        await user.save();
        const fresh = await User.findOne({ email });
        console.log("AFTER save password hash:", fresh.password);


        return res.sendStatus(200);
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;