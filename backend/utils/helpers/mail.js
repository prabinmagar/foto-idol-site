const path = require("path");
const nodemailer = require("nodemailer");
const generateTemplate = require("../../mail/template");
const { NODE_MAILER_USER, NODE_MAILER_PASS, VERIFICATION_EMAIL, FORNTEND_URL, SIGN_IN_URL } = require("../variables");

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: NODE_MAILER_USER,
      pass: NODE_MAILER_PASS,
    },
    debug: true,
  });
  return transport;
};

const sendVerificationMail = (verificationToken, profile) => {
  const transport = generateMailTransporter();
  const { name, email } = profile;
  const message = `Welcome to OurApp! Dear ${name}, We're thrilled to have you on board. Thank you for choosing OurApp! To get started, all you need to do is verify your account.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Welcome to OurApp! Verify Your Account to Get Started",
    html: generateTemplate({
      title: "Activate Your Account!",
      message: message,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: `${FORNTEND_URL}/auth/verify/${verificationToken}`,
      btnTitle: "Verify Your Account",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.jpg",
        path: path.join(__dirname, "../../mail/images/welcome.jpg"),
        cid: "welcome",
      },
    ],
  });
};

const sendForgotPassworLink = (options) => {
  const transport = generateMailTransporter();
  const { name, email, link } = options;
  const message = `We received a request to reset your password for your account with ${name}. To proceed with the password reset process, please click the link below: 
  <br/> <b>If you didn't initiate this request, you can safely ignore this email. Your account security is important to us, and no changes will be made to your password.</b>
  `;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Password Reset Request",
    html: generateTemplate({
      title: "Password Reset Instructions",
      message: message,
      logo: "cid:logo",
      banner: "cid:forgot",
      link: link,
      btnTitle: "Reset Password",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "forgot.jpg",
        path: path.join(__dirname, "../../mail/images/forgot.jpg"),
        cid: "forgot",
      },
    ],
  });
};

const sendPasswordResetSuccessEmail = (name, email) => {
  const transport = generateMailTransporter();

  const message = `Hello <code>${name}</code> We're writing to confirm that your password has been successfully updated. You can now log in to your account using your new password.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Your Password Has Been Successfully Updated",
    html: generateTemplate({
      title: "Password Updated Successfully",
      message: message,
      logo: "cid:logo",
      banner: "cid:passowordUpdate",
      link: SIGN_IN_URL,
      btnTitle: "Log In Now",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "forgot.jpg",
        path: path.join(__dirname, "../../mail/images/passowordUpdate.jpg"),
        cid: "passowordUpdate",
      },
    ],
  });
};

const sendOtpCode = ({ name, email, code }) => {
  const transport = generateMailTransporter();

  const message = `Dear <code>${name}</code> We've just sent a verification OTP to your email address: <i>${email}</i>. Please check your inbox and spam folder if needed.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Your Verification OTP Has Arrived",
    html: generateTemplate({
      title: "Verify Your Account",
      message: message,
      logo: "cid:logo",
      banner: "cid:otp",
      link: "#",
      btnTitle: code,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "otp.jpg",
        path: path.join(__dirname, "../../mail/images/otp.jpg"),
        cid: "otp",
      },
    ],
  });
};

const RepliedToContactForm = ({ email, text }) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Thank You for Contacting Us",
    html: generateTemplate({
      title: "Thank You for Reaching Out",
      message: text,
      logo: "cid:logo",
      banner: "cid:thanks",
      link: "#",
      btnTitle: "Thanks You",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "thanks.jpg",
        path: path.join(__dirname, "../../mail/images/thanks.jpg"),
        cid: "thanks",
      },
    ],
  });
};

const sendAutomatedEmailTrs = (options) => {
  const transport = generateMailTransporter();
  const { message, email } = options;

  const link = `${process.env.FORNTEND_URL}${url}`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Password Reset Request",
    html: generateTemplate({
      title: "Password Reset Instructions",
      message: message,
      logo: "cid:logo",
      banner: "cid:forgot",
      link: link,
      btnTitle: "Reset Password",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../../mail/images/logo.png"),
        cid: "logo",
      },
      {
        filename: "forgot.jpg",
        path: path.join(__dirname, "../../mail/images/forgot.jpg"),
        cid: "forgot",
      },
    ],
  });
};

module.exports = {
  sendVerificationMail,
  sendForgotPassworLink,
  sendPasswordResetSuccessEmail,
  sendOtpCode,
  RepliedToContactForm,
  sendAutomatedEmailTrs,
};
