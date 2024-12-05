
const UserModel = require("../Model/UserModel");
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const otpStore = {};

const Ragister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userexist = await UserModel.findOne({ email });
    
    if (!userexist) {
      await bcrypt.hash(password, 4, (error, hash) => {
        const user = UserModel.create({
          name,
          email,
          password: hash,
        });
        res.status(201).json({ message: "User created successfully" });
      });
    } else {
      return res.status(400).json({ message: "User already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in creating user" });
  }
};

const Login = async (req, res) => {
  try {
   
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        const token = jwt.sign({ userid: userExist._id }, "Red");
        res.status(200).json({ message: "User logged in successfully" ,token : token});
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
};

const ForgotPassword = async (req, res) => {
  try {
  const { email } = req.body;
    
  const userExist=await UserModel.findOne({ email });
  
    if (userExist) {
      let otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = otp;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
  
      const mailOption = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for Password reset is : ${otp}`,
      };
  
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          return res.send({ msg: "Failed to generate OTP" });
        }
        return res.send({ msg: "OTP Generated Successfully" });
      });
    } else {
      return res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    return res.status(501).send({ msg: "Error in forgot password " });
    
  }

};





const Resetpassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;
    console.log(email, otp, newpassword);

    if (!email || !otp || !newpassword) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while resetting the password" });
  }
};

module.exports = {
  Ragister,
  Login,
  ForgotPassword,
  Resetpassword
};
