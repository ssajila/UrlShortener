var express = require("express");
const validUrl = require("valid-url");
const Url = require("../models/url_model");

const config = require("../config/default.json");
const urlController = require("../controller/url_controller");

var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  res.render("index");
});


router.post("/shorturl", async (req, res) => {

  const longUrl = req.body.fullUrl;
  console.log(req.body.fullUrl);
  const baseUrl = config.baseUrl;
  // check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.json({ message: "Invalid base url" });
  }

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        console.log("Already exists...");
        res.json({ data: url, status: true });
      } else {
        urlController.doshort(longUrl, baseUrl).then((response) => {
          res.json(response);
        });
      }
    } catch (error) {
      console.error(error);
      res.json({ message: "Some error has occurred" });
    }
  } else {
    console.log("sdfdsgsfgsg")
    return res.json({ message: "Invalid URL" });
  }
});
router.get("/:urlCode", async (req, res) => {
  try {
    console.log(req.params);
    const url = await Url.findOne({ urlCode: req.params.urlCode });

    if (url) {
      url.clicks++;
      url.save();
      console.log("Long url found for short url. Redirecting...");
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "No url found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Some error has occurred" });
  }
});

module.exports = router;
