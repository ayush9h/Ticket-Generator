const User = require("../models/User");

exports.createUser = async (req, res) => {
  const {userMail} = req.body;

  try {
    let user = await User.findOne({ userMail });

    if (user) {
      return res.status(200).json(user);
    }else{
       return res.status(400).json({ error: "User not found in the Database." });
    }

  } catch (error) {
    res.status(500).json({ error: "There was an error while fetching the user" });
  }
};
