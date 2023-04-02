var express = require("express");
const validUrl = require("valid-url");
const Url = require("../models/url_model");

const config = require("../config/default.json");
module.exports = {
  
  doshort: (longUrl,baseUrl) => {
    return new Promise(async (resolv, reject) => {
    
        // create url code
            let urlCode = Math.random()
              .toString(36)
              .replace(/[^a-z0-9]/gi, "")
              .substr(2, 10);

            let shortUrl = baseUrl + "/" + urlCode;

            url = new Url({
              longUrl,
              shortUrl,
              urlCode,
              date: new Date(),
            });

            console.log("Saving new record...");
            await url.save().then((data)=>{
                resolv({ data: url, status: true });

            });    
    });
  },
};
