import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// API route to healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API route to book an appointment and dispatch an email
app.post("/api/book-appointment", async (req, res) => {
  const { appointment, serviceTitle } = req.body;

  if (!appointment) {
    return res.status(400).json({ error: "No appointment details provided" });
  }

  const targetEmail = "munagantiraviteja@gmail.co";

  console.log(`[Email Service] Received booking trigger for ${appointment.id}. Attempting dispatch to ${targetEmail}`);

  // Construct elegant HTML email template
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Appointment Booking Confirmation</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #F8F9FA;
          margin: 0;
          padding: 20px;
          color: #2D3748;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(26, 54, 93, 0.04);
        }
        .header {
          background-color: #1A365D;
          color: #FFFFFF;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .section-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #4A90E2;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .ticket-id {
          display: inline-block;
          background-color: #EBF8FF;
          color: #2B6CB0;
          font-size: 13px;
          font-family: monospace;
          font-weight: bold;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 20px;
        }
        .details-grid {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .details-grid td {
          padding: 12px 0;
          border-bottom: 1px solid #EDF2F7;
        }
        .details-grid td.label {
          color: #718096;
          font-size: 14px;
          font-weight: 500;
          width: 35%;
        }
        .details-grid td.value {
          color: #2D3748;
          font-size: 15px;
          font-weight: 600;
        }
        .notes-box {
          background-color: #F7FAFC;
          border-left: 4px solid #FF6B6B;
          padding: 15px;
          font-size: 14px;
          font-style: italic;
          color: #4A5568;
          border-radius: 0 8px 8px 0;
        }
        .footer {
          background-color: #F7FAFC;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #A0AEC0;
          border-top: 1px solid #EDF2F7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Ravi's Clinic</h1>
          <p>Clinical Appointment Notification</p>
        </div>
        <div class="content">
          <div class="ticket-id">APPOINTMENT ID: ${appointment.id}</div>
          <h2 style="font-size: 20px; color: #1A365D; margin-top: 0; margin-bottom: 25px;">A new medical appointment has been requested.</h2>
          
          <div class="section-title">Evaluation Details</div>
          <table class="details-grid">
            <tr>
              <td class="label">Patient Name</td>
              <td class="value">${appointment.patientName}</td>
            </tr>
            <tr>
              <td class="label">Medical Service</td>
              <td class="value">${serviceTitle || appointment.serviceId}</td>
            </tr>
            <tr>
              <td class="label">Date</td>
              <td class="value">${appointment.date}</td>
            </tr>
            <tr>
              <td class="label">Preferred Time</td>
              <td class="value">${appointment.timeSlot}</td>
            </tr>
            <tr>
              <td class="label">Contact Email</td>
              <td class="value"><a href="mailto:${appointment.patientEmail}" style="color: #4A90E2; text-decoration: none;">${appointment.patientEmail}</a></td>
            </tr>
            <tr>
              <td class="label">Contact Phone</td>
              <td class="value">${appointment.patientPhone}</td>
            </tr>
          </table>

          ${appointment.notes ? `
            <div class="section-title">Patient Statements & Notes</div>
            <div class="notes-box">"${appointment.notes}"</div>
          ` : ""}
        </div>
        <div class="footer">
          This is an automated administrative notification dispatched by Ravi’s Clinic online registry.<br>
          © 2026 Ravi's Clinic. Professional Medical Care.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    let transporter;
    let isTestAccount = false;

    // Check if custom SMTP credentials exist in environment
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      console.log("[Email Service] Using production SMTP server configurations.");
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      console.log("[Email Service] No custom SMTP credentials detected. Materializing a temporary test inbox...");
      // Generate Ethereal Email SMTP test account on-the-fly
      const testAccount = await nodemailer.createTestAccount();
      isTestAccount = true;
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    const mailOptions = {
      from: `"Ravi's Clinic Alerts" <alerts@ravisclinic.example.com>`,
      to: targetEmail,
      subject: `[Ravi's Clinic] New Urgent Appointment: ${appointment.patientName} - ${appointment.id}`,
      text: `Ravi's Clinic - New Appointment Notification\n\nID: ${appointment.id}\nPatient: ${appointment.patientName}\nService: ${serviceTitle || appointment.serviceId}\nDate: ${appointment.date}\nTime: ${appointment.timeSlot}\nEmail: ${appointment.patientEmail}\nPhone: ${appointment.patientPhone}\nNotes: ${appointment.notes || "None"}`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Mail successfully sent. Message ID: ${info.messageId}`);
    
    let previewUrl = "";
    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info) || "";
      console.log(`[Email Service] View test email on Ethereal platform at: ${previewUrl}`);
    }

    return res.json({
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
      isTest: isTestAccount,
    });
  } catch (error: any) {
    console.error("[Email Service] Mail sending error caught:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to dispatch email notification",
    });
  }
});

// Start server
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Active & listening on http://0.0.0.0:${PORT}`);
  });
}

boot().catch((err) => {
  console.error("[Server] Boot exception:", err);
});
