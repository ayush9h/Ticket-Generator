const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { userId, userMail, userName } = req.body;

  try {
    let user = await User.findOne({ userMail });

    if (user) {
      return res.status(200).json(user);
    }

    user = await User.create({ userId, userMail, userName });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error while creating the user" });
  }
};
