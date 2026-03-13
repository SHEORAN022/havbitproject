const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.log("Email Error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.log("Resend Error:", err);
    return false;
  }
};

module.exports = sendEmail;
