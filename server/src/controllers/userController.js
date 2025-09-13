const jwt = require("jsonwebtoken")
const User = require("../models/User");

exports.createUser = async (req, res) => {
  const {userMail} = req.body;

  try {
    let user = await User.findOne({ userMail });

    if(!user){
      return res.status(400).json({
        error:"User not found in the database."
      })
    }

    const payload = {
      id: user._id,
      userMail:  userMail,
      userName: user.userName,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.status(200).json({
      token,
      user: payload,
    })

  } catch (error) {
    res.status(500).json({ error: `There was an error while fetching the user due to ${error}` });
  }
};
