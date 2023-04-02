const mongoose = require("mongoose");

const config = require('../config/default.json');
 
const DB_URI = config.mongodbUrl
 console.log(DB_URI)
// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

// export the connection object
module.exports = connection