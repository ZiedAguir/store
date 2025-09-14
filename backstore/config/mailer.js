const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // false pour 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Pour éviter les erreurs liées aux certificats
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Erreur de connexion SMTP :', error);
  } else {
    console.log('Connexion SMTP réussie :', success);
  }
});


module.exports = transporter;
