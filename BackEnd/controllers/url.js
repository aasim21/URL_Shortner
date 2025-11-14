//Imports
const { body, validationResult } = require("express-validator");
const URL = require("../models/url");
const shortid = require("shortid");
const { findByIdAndUpdate } = require("../models/url");
//PORT NUMBER
const PORT = process.env.PORT || 5000;

//Handling New URL
const handleGenerateNewShortURL = [
  body('url')
  .exists().withMessage('URL is Required')
  .bail()
  .notEmpty().withMessage('URL should not be empty')
  .bail()
  .isURL({required_protocol:true}).withMessage('Must be a valid URL'),

  async(req, res) => {
  try {
    //Validating FrontEnd Data
    const body =  req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({errorMessage: errors.array()[0].msg});

    //Checking for duplicate URLs
    const isExist = await URL.findOne({redirectURL: body.url});
    if(isExist){
    const short_url = `http://localhost:${PORT}/${isExist.short_id}`;
    return res.status(200).json({ url: short_url });
    }
    //Generating Unique ShortID
    let shortID ;
    while(true){
    shortID = shortid();
    const isshortIdExist = await URL.findOne({short_id: shortID});
    if(!isshortIdExist) break;
    }
    const result = await URL.create({
      short_id: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    if(result){
    const short_url = `http://localhost:${PORT}/${result.short_id}`;
    return res.status(200).json({ url: short_url });
    }
  } catch(error) {
    res.status(500).json({errorMessage:error.message});
  }
}]

async function handleGetAnalytics(req, res) {
  try{const short_id = req.params.id;
  const result = await URL.findOne({ short_id });
  if (!result) return res.status(400).json({ error: "Invalid URL" });
  return res
    .status(200)
    .json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });}
    catch(error){
        res.status(500).json({errorMessage:error.message});
    }
}

const handleRedirectURL = async (req, res, next) => {
  try {
    const id = req.params.id;
    if(!id) return res.status(400).json({error:'ID is required'});
    const result = await URL.findOneAndUpdate(
      { short_id: id },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true }
    );
    if (!result) return res.status(400).json({ errorMessage: "Invalid URL" });
    return  res.redirect(result.redirectURL);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
};
