import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, fullName, customId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
  from: `"FoodApp" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Xác minh tài khoản FoodApp",
  html: `
    <h3>Xin chào ${fullName},</h3>
    <p>Cảm ơn bạn đã đăng ký FoodApp.</p>
    <p>Nhấn vào nút bên dưới để xác minh tài khoản:</p>
    <a href="http://192.168.1.103:4000/api/users/verify?email=${email}" style="padding:10px 20px;background:#f97316;color:#fff;text-decoration:none;border-radius:5px;">Xác minh ngay</a>
  `,
};

  await transporter.sendMail(mailOptions);
};