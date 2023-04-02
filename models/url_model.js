const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clicks: {
        type: Number,
        required: true,
        default: 0,
      },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("ShortUrl", urlSchema);



