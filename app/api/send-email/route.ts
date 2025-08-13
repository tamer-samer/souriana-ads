import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER || "testuser@gmail.com",
        pass: process.env.SMTP_PASS || "your-app-password",
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER || "testuser@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email sent successfully",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
