const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user_schema");
const nodemailer = require("nodemailer");
const { transporter } = require("../service/serviceMail");
const JWT_SECRET_KEY = "sdfsdfsdfsdfsdfs123123123df";

//User Siginup API
const userSignup = async function (req, res) {
  const { email, password } = req.body;
  const userData = new User(req.body);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        error: "Email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
    const filePath = `/uploads/${req.file.filename}`;
    userData.profilepic = filePath;
    await userData.save();
    return res.status(201).json({
      success: true,
      message: "Registation successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//User Login API
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const userData = await User.findOne({ email: email });
      if (userData != null) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (userData.email === email && isMatch) {
          const token = jwt.sign(
            { userID: userData._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          return res.status(200).json({
            success: true,
            message: "Login success",
            userData: userData,
            token: token,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Password or Email is not match",
          });
        }
      } else {
        res
          .status(403)
          .json({ success: false, message: "Email user is not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//User Send Email for Reset Password API
const sendUserResetPasswordEmail = async (req, res) => {
    let { email } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:"patel.shiva121@gmail.com",
          pass: "lcut gfhw cjyz nwjr",
        },
      });
  
      let details = {
        from: "patel.shiva121@gmail.com",
        to: email,
        subject: "Hellow its me",
        text: `http://localhost:3000/user/reset-Password/${email}`,
      };
  
      transporter.sendMail(details, async (err) => {
        if (err) {
          console.error(err.message);
        } else {
          res.status(200).send({ status: true, message: "Email Send" });
          console.log("Email sent");
        }
      });
    } catch (error) {
      console.log(error.message);
      res.send({ status: false, message: "server Down" });
    }
  };


//User Reset Password API
const userPasswordReset = async (req, res) => {
  const { newPassword, confirmPassword,email } = req.body;
  console.log(newPassword, confirmPassword,email)
  try {
    const checkUser = await User.findOne({email});
    let updateUser = new User(checkUser)
    if(newPassword!=confirmPassword){return res.send({success: false,message:"Password Does not match"})}
    console.log(updateUser)
    let newpassword = await bcrypt.hash(newPassword,10)
    updateUser.password=newpassword;
    updateUser.save();
    
    res.send({success:true,message:"update Successfully"})

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  sendUserResetPasswordEmail,
  userPasswordReset,
};
