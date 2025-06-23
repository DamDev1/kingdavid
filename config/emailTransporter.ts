import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tubetroveofficial@gmail.com',
    pass: 'tvzpgxjjolaczgow',
  },
});

export default transporter;