class EmailService {
    async sendWelcomeEmail(userEmail) {
        console.log(`Sending welcome email to: ${userEmail}... `);
        // Yahan Nodemailer ya SendGrid ka logic aayega
    }

    async sendOTPEmail(userEmail, otp) {
        console.log(`Sending OTP ${otp} to ${userEmail}... `);
        // Logic for sending OTP
    }
}

module.exports = new EmailService();