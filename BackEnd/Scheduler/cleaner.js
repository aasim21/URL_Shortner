const URL = require("../models/url");

const handleExpiredURL = async (req,res) => {
  try {
    const now = Date.now();
    const result = await URL.deleteMany({ expiresAt: { $lt: now } });
    res.status(200).send("CleanUp Executed");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  handleExpiredURL,
};
