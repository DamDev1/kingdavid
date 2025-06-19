import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tubetroveofficial@gmail.com',
    pass: 'tvzpgxjjolaczgow', // store this in .env
  },
});

export default transporter;