import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // important for port 587
  auth: {
    user: "foodpandatestbyriyad@gmail.com",
    pass: "xpju juaz iozy wyei"
  },


});

// ✅ verify connection
export const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send emails");
  } catch (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  }
};

export const sendOtpEmail = async (to, otp) => {
  try {
    if (!to) {
      throw new Error("Recipient email is missing");
    }

    const mailOptions = {
      from: `"FoodPanda Clone" <${process.env.SMTP_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial; padding: 10px;">
          <h2>Your OTP Code</h2>
          <p>Your OTP is: <strong>${otp}</strong></p>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // console.log("✅ Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    return false;
  }
};