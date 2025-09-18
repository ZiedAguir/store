const asyncHandler = require('express-async-handler');
const { sendEmail } = require('../utils/Email/sendEmail');

// @desc    Send contact form message
// @route   POST /api/v1/contact
// @access  Public
exports.sendContactMessage = asyncHandler(async (req, res, next) => {
  const { name, email, phone, project, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, email, subject, and message are required'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email address'
    });
  }

  try {
    // Create email content
    const emailSubject = `Contact Form Message: ${subject}`;
    const emailContent = `
New contact form submission from your website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Project: ${project || 'Not specified'}
Subject: ${subject}

Message:
${message}

---
TO REPLY TO THIS USER:
1. Reply to this email
2. Your reply will be automatically sent to: ${email}
3. The user will receive your response

Time: ${new Date().toLocaleString()}
    `.trim();

    // Send email to zieguir99@gmail.com with Reply-To set to user's email
    await sendEmail('zieguir99@gmail.com', emailSubject, emailContent, {
      replyTo: email,
      headers: {
        'Reply-To': email,
        'X-User-Email': email,
        'X-User-Name': name
      }
    });

    // Send confirmation email to the user
    const confirmationSubject = 'Thank you for contacting us!';
    const confirmationContent = `
Hello ${name},

Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.

Here's a summary of your message:
Subject: ${subject}
Message: ${message}

Best regards,
Astar Store Team
    `.trim();

    await sendEmail(email, confirmationSubject, confirmationContent);

    res.status(200).json({
      status: 'success',
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      status: 'error',
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// @desc    Forward email reply to user
// @route   POST /api/v1/contact/forward-reply
// @access  Public (for email forwarding)
exports.forwardEmailReply = asyncHandler(async (req, res, next) => {
  const { userEmail, replyMessage, originalSubject } = req.body;

  if (!userEmail || !replyMessage) {
    return res.status(400).json({
      status: 'error',
      message: 'User email and reply message are required'
    });
  }

  try {
    // Send reply to user
    const replySubject = `Re: ${originalSubject || 'Your inquiry'}`;
    const replyContent = `
Hello,

Thank you for contacting us. Here is our response:

${replyMessage}

---
Best regards,
Astar Store Team

---
This is an automated response to your contact form inquiry.
    `.trim();

    await sendEmail(userEmail, replySubject, replyContent);

    res.status(200).json({
      status: 'success',
      message: 'Reply forwarded successfully'
    });

  } catch (error) {
    console.error('Error forwarding reply:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error forwarding reply'
    });
  }
});
