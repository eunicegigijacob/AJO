const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendmessage = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log('message sent');
  } catch (error) {
    logger.error(getErrorMessage(error));
  }
};

module.exports = { sendmessage };
