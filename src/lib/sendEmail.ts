import type SMTPTransport from "nodemailer/lib/smtp-transport"
import nodemailer from "nodemailer"

type SendEmailOptions = {
  name: string
  to: string
  subject: string
  html?: string
  message?: string
}

const smpt = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "yogeshsamsiofficial@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

const sendEmail = async ({
  name,
  to,
  subject,
  html,
  message,
}: SendEmailOptions) => {
  if (!message && !html)
    throw new Error("Invalid input - No message or html received")

  let status: SMTPTransport.SentMessageInfo | undefined

  try {
    if (!message || message.toLowerCase() === "html") {
      status = await smpt.sendMail({
        from: "yogeshsamsiofficial@gmail.com",
        to,
        subject,
        html: `
        <body>
          <p>Dear ${name},</p>

          ${html}
  
        <p>Many thanks,
          <br />
          <b>Yogesh Samsi Official Team</b>
        </p>
        </body>
        `,
      })
    } else {
      status = await smpt.sendMail({
        from: "yogeshsamsiofficial@gmail.com",
        to,
        subject,
        text: `Dear ${name},\n\n${message}\n\nMany thanks,\nYogesh Samsi Official Team`,
      })
    }
  } catch (error) {
    console.log(error)
    status = undefined
  }

  return status
}

export default sendEmail
