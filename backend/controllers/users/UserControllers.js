const asyncHandler = require("express-async-handler");
const UserModel = require("../../models/users/UserModel");
const parse = require("ua-parser-js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Cryptr = require("cryptr");
const { generateToken, formatUser, hashToken } = require("../../utils/helpers");
const TokenModel = require("../../models/users/TokenModel");
const jwt = require("jsonwebtoken");
const { sendVerificationMail, sendForgotPassworLink, sendPasswordResetSuccessEmail, sendOtpCode, sendAutoMail, sendAutomatedEmailTrs } = require("../../utils/helpers/mail");
const cloudinary = require("cloudinary").v2;
const { OAuth2Client } = require("google-auth-library");
const SocialMediaModel = require("../../models/users/SocialMediaModel");

const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const client = new OAuth2Client(process.env.GOOGLE_ClIENT_ID);

const register = asyncHandler(async (req, res) => {
  const { name, email, password, country } = req.body;
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this email address already exists. Please use a different email address or try logging in.");
  }

  const ua = parse(req.headers["user-agent"]);
  const userAgent = [ua.ua];
  const user = await UserModel.create({
    name,
    email,
    password,
    country,
    userAgent,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 604800), // 7day
    sameSite: "none",
    secure: true,
  });
  if (user) {
    const { _id, name, email, phone, bio, avatar, role, isVerified, country } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      avatar,
      role,
      isVerified,
      country,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No user found with this email address. Please register for a new account.");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Incorrect email or password. Please check your credentials and try again.");
  }

  const ua = parse(req.headers["user-agent"]);
  const currentUserAgent = [ua.ua];

  const allowedAgent = user.userAgent.includes(currentUserAgent);
  if (!allowedAgent) {
    const loginCode = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP Code for Login if device is different " + loginCode);

    const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    let userToken = await TokenModel.findOne({ userId: user._id });
    if (userToken) {
      await userToken.deleteOne();
    }

    await new TokenModel({
      userId: user._id,
      loginToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // 30mins
    }).save();

    res.status(400);
    throw new Error("A new or unrecognized browser/device has been detected for your account. For security reasons, please verify your identity to continue.");
  }

  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 604800), // 7day
      sameSite: "none",
      secure: true,
    });

    if (user) {
      const { _id, name, email, phone, bio, avatar, role, isVerified } = user;
      res.status(200).json({ _id, name, email, phone, bio, avatar, role, isVerified, token });
    }
  } else {
    res.status(400);
    throw new Error("An unexpected error occurred. Please check your input and try again. If the problem persists, contact support for assistance.");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No user found with this email address. Please register for a new account.");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Incorrect email or password. Please check your credentials and try again.");
  }

  const ua = parse(req.headers["user-agent"]);
  const currentUserAgent = [ua.ua];

  const allowedAgent = user.userAgent.includes(currentUserAgent);
  if (!allowedAgent) {
    const loginCode = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP Code for Login if device is different " + loginCode);

    const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    let userToken = await TokenModel.findOne({ userId: user._id });
    if (userToken) {
      await userToken.deleteOne();
    }

    await new TokenModel({
      userId: user._id,
      loginToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // 30mins
    }).save();

    res.status(400);
    throw new Error("A new or unrecognized browser/device has been detected for your account. For security reasons, please verify your identity to continue.");
  }

  if (user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied. You must be an admin to log in.");
  }

  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 604800), // 7day
      sameSite: "none",
      secure: true,
    });

    if (user) {
      const { _id, name, email, phone, bio, avatar, role, isVerified } = user;
      res.status(200).json({ _id, name, email, phone, bio, avatar, role, isVerified, token });
    }
  } else {
    res.status(400);
    throw new Error("An unexpected error occurred. Please check your input and try again. If the problem persists, contact support for assistance.");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "You have been successfully logged out. Thank you for using our services!",
  });
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  //verify toke
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, bio, avatar, role, isVerified, country, address, token } = user;
    res.status(200).json({ _id, name, email, phone, bio, avatar, role, isVerified, country, address, token });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    const updatedUser = { ...user.toObject() };

    updatedUser.name = req.body.name || user.name;
    updatedUser.phone = req.body.phone || user.phone;
    updatedUser.bio = req.body.bio || user.bio;
    updatedUser.address = req.body.address || user.address;

    if (req.file) {
      const localPath = req.file.path;
      const imgUploaded = await cloudinary.uploader.upload(localPath, {
        folder: "Photo Idol/Avatar",
        transformation: [{ width: 150, height: 150, crop: "fill" }],
      });

      updatedUser.avatar = {
        url: imgUploaded.secure_url,
        publicId: imgUploaded.public_id,
      };

      if (user.avatar && user.avatar.publicId) {
        await cloudinary.uploader.destroy(user.avatar.publicId);
      }
    } else {
      updatedUser.avatar = user.avatar || {
        url: "https://cdn-icons-png.flaticon.com/512/3940/3940417.png",
      };
    }

    const savedUser = await UserModel.findByIdAndUpdate(req.user._id, updatedUser, { new: true });

    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      phone: savedUser.phone,
      bio: savedUser.bio,
      avatar: savedUser.avatar,
      address: savedUser.address,
      role: savedUser.role,
      isVerified: savedUser.isVerified,
      message: "Your profile has been successfully updated.",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("The requested user was not found. Please check the user ID or ensure the user exists.");
  }
  if (user.isVerified) {
    res.status(400);
    throw new Error("This user account is already verified.");
  }

  //Delete token if it exits on DB
  let token = await TokenModel.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // create verification token and save it
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

  // hash token and save
  const hashTokens = hashToken(verificationToken);

  await new TokenModel({
    userId: user._id,
    verificationToken: hashTokens,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000),
  }).save();

  const profile = {
    name: user.name,
    email: user.email,
  };
  try {
    await sendVerificationMail(verificationToken, profile);
    res.status(200).json({ message: "An email has been successfully sent. Please check your inbox." });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Email not send, please try again");
  }
});

const verifiedToUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const hashedToken = hashToken(verificationToken);

  const usertoken = await TokenModel.findOne({
    verificationToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  if (!usertoken) {
    res.status(404);
    throw new Error("The provided token is either invalid or has expired. Please request a new token.");
  }

  // Find User
  const user = await UserModel.findOne({ _id: usertoken.userId });
  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  user.isVerified = true;
  await user.save();
  res.status(200).json({ message: "Your account has been successfully verified. Welcome!" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user found with this email address. Please double-check the email you provided or register for a new account.");
  }

  // Delete Token if it exists in DB
  let token = await TokenModel.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new TokenModel({
    userId: user._id,
    resetToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FORNTEND_URL}/auth/reset-password/${resetToken}`;

  try {
    await sendForgotPassworLink({ link: resetUrl, name: user.name, email: user.email });
    res.status(200).json({ message: "A password reset link has been sent to your email address." });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("An error occurred while sending the email. Please try again later.");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = hashToken(resetToken);

  const usertoken = await TokenModel.findOne({
    resetToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!usertoken) {
    res.status(404);
    throw new Error("The provided token is either invalid or has expired. Please request a new password reset link.");
  }

  // Find User
  const user = await UserModel.findOne({ _id: usertoken.userId });

  user.password = password;
  await user.save();
  await sendPasswordResetSuccessEmail(user.name, user.email);
  res.status(200).json({ message: "Your password has been successfully reset. You can now log in with your new password." });
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("No user found with this email address. Please sign up for a new account.");
  }

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Both the old and new passwords are required to complete this action.");
  }

  // Check if oldPassword matches the password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("The old password you entered is incorrect. Please double-check and try again.");
  }

  // Check if the new password is different from the old password
  const newPasswordIsDifferent = oldPassword !== newPassword;
  if (!newPasswordIsDifferent) {
    res.status(400);
    throw new Error("The new password must be different from the old password.");
  }

  // Update the password if all checks pass
  user.password = newPassword;
  await user.save();
  await sendPasswordResetSuccessEmail(user.name, user.email);
  res.status(200).json({ message: "Your password has been successfully changed. You can now log in with your new password." });
});

const sendOTPctr = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user found with this email address.");
  }

  // find login code(OTP) in DB
  let userToken = await TokenModel.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("The provided token is invalid or has expired. Please log in again.");
  }

  const loginCode = userToken.loginToken;
  const decryptedLoginCode = cryptr.decrypt(loginCode.toString());
  console.log("Send this code to email " + decryptedLoginCode);

  try {
    await sendOtpCode({ name: user.name, email, code: decryptedLoginCode });
    res.status(200).json({
      message: `A verification OTP has been sent to your email address. Please check your email and enter the OTP to continue.`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const loginWithOTP = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { loginCode } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // find login code(OTP) in DB
  let userToken = await TokenModel.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("The provided token is invalid or has expired. Please log in again.");
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.loginToken);

  if (loginCode !== decryptedLoginCode) {
    res.status(404);
    throw new Error("The OTP code you entered is incorrect. Please double-check and try again.");
  } else {
    // Register userAgent
    const ua = parse(req.headers["user-agent"]);
    const currentUserAgent = ua.ua;
    user.userAgent.push(currentUserAgent);
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // send http-only cookie
    res.cookie("token", token, {
      path: "/", // set default
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 604800), // 7day
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ profile: formatUser(user), message: "Login successful. Welcome back!" });
  }
});

const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const { name, email, picture, sub } = payload;
  const password = Date.now() + sub;

  const ua = parse(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  const user = await UserModel.findOne({ email });

  if (!user) {
    //create new user or register
    const newUser = await UserModel.create({
      name,
      email,
      password,
      avtar: picture,
      isVerified: true,
      userAgent,
    });

    if (newUser) {
      // genrate token
      const token = generateToken(newUser._id);

      // send http-only cookie
      res.cookie("token", token, {
        path: "/", // set default
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 604800), // 7day
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({ profile: formatUser(user), message: "User account successfully created." });
    }
  }

  // user exits => then login
  if (user) {
    // genrate token
    const token = generateToken(user._id);

    // send http-only cookie
    res.cookie("token", token, {
      path: "/", // set default
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 604800), // 7day
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ profile: formatUser(user), message: "Login successful. Welcome back!" });
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.avatar && user.avatar.publicId) {
    await cloudinary.uploader.destroy(user.avatar.publicId);
  }

  await user.deleteOne();
  res.status(200).json({
    message: "Your account has been successfully deleted. We're sorry to see you go. If you ever decide to return, we'll be here to welcome you back.",
  });
});

/* ---------------  Admin Access Control --------------- */
const getAllAccounts = asyncHandler(async (req, res) => {
  const usersList = await UserModel.find().sort("-createdAt").select("-password");

  if (!usersList) {
    res.status(500);
    throw new Error("An unexpected error occurred. Please try again later or contact our support team for assistance.");
  }

  let totalUsers = 0;
  let guestUsers = 0;
  let authorUsers = 0;
  let adminUsers = 0;

  usersList.forEach((user) => {
    totalUsers++;

    if (user.role === "guest") {
      guestUsers++;
    } else if (user.role === "author") {
      authorUsers++;
    } else if (user.role === "admin") {
      adminUsers++;
    }
  });

  const data = {
    totalUsers,
    guestUsers,
    authorUsers,
    adminUsers,
    usersList,
  };

  res.status(200).json(data);
});

const getAccount = asyncHandler(async (req, res) => {
  let userId;

  if (req.body && req.body.id) {
    userId = req.body.id;
  } else if (req.params && req.params.id) {
    userId = req.params.id;
  }

  if (!userId) {
    res.status(400);
    throw new Error("User ID is missing in the request.");
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json(formatUser(user));
});

const deleteAccountByAdmin = asyncHandler(async (req, res) => {
  let userId;

  if (req.body && req.body.id) {
    userId = req.body.id;
  } else if (req.params && req.params.id) {
    userId = req.params.id;
  }

  if (!userId) {
    res.status(400);
    throw new Error("User ID is missing in the request.");
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

const updateRole = asyncHandler(async (req, res) => {
  const { role, id } = req.body;

  const user = await UserModel.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("No user found with the provided details. Please check your input and try again.");
  }

  user.role = role;
  await user.save();
  res.status(200).json({ message: `The user's role has been successfully updated to ${role}.` });
});

const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject } = req.body;

  if (!subject) {
    res.status(500);
    throw new Error("Missing subject parameter");
  }

  //get user
  const user = await UserModel.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const name = user.name;

  try {
    await sendAutomatedEmailTrs({ name, subject });
    res.status(200).json({ message: "Email Send" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not send, please try again");
  }
});
/* ---------------  Admin Access Control --------------- */

/* ---------------  Social Media Link --------------- */
const createLinks = async (req, res) => {
  try {
    const { links } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user._id

    const socialMediaLink = await SocialMediaModel.findOne({ user: userId });

    if (!socialMediaLink) {
      const newSocialMediaLink = new SocialMediaModel({
        user: userId,
        links: links.map((link) => ({ link: link.link, visibility: link.visibility })),
      });

      await newSocialMediaLink.save();
      return res.status(201).json(newSocialMediaLink);
    }

    const newLinks = links.map((link) => ({ link: link.link, visibility: link.visibility }));
    socialMediaLink.links = socialMediaLink.links.concat(newLinks);
    await socialMediaLink.save();

    return res.status(201).json(socialMediaLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the links" });
  }
};

const getLinks = async (req, res) => {
  try {
    const user = req.user._id;
    const links = await SocialMediaModel.find({ user });
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not found the links" });
  }
};
const getUserLinks = async (req, res) => {
  try {
    const user = req.params.id;
    const links = await SocialMediaModel.findOne({ user });
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not found the links" });
  }
};

const deleteLink = async (req, res) => {
  try {
    const linkIdToDelete = req.params.id;

    // Find the user document by ID
    const user = await SocialMediaModel.findOne({ user: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the link to delete by its ID within the user's links
    const linkToDelete = user.links.find((link) => link._id == linkIdToDelete);

    if (!linkToDelete) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Remove the link from the user's links array
    user.links.pull(linkToDelete);

    // Save the user document to reflect the deletion
    await user.save();

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateLink = async (req, res) => {
  try {
    const linkIdToUpdate = req.params.id;
    const { link, visibility } = req.body;

    const updatedLink = await SocialMediaModel.findOneAndUpdate(
      {
        user: req.user.id,
        "links._id": linkIdToUpdate,
      },
      {
        $set: {
          "links.$.link": link || undefined,
          "links.$.visibility": visibility || undefined,
        },
      },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link updated successfully", updatedLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/* ---------------  Social Media Link --------------- */

module.exports = {
  register,
  login,
  adminLogin,
  logout,
  getUserProfile,
  updateUserProfile,
  loginStatus,
  verifiedToUser,
  sendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  loginWithOTP,
  sendOTPctr,
  loginWithGoogle,
  deleteAccount,
  getAllAccounts,
  getAccount,
  deleteAccountByAdmin,
  updateRole,
  sendAutomatedEmail,
  createLinks,
  getLinks,
  deleteLink,
  updateLink,
  getUserLinks,
};
