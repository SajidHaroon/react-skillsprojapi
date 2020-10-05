require('dotenv').config()

let PORT = process.env.PORT || 3030
let mongoDB_URI = process.env.mongoDB_URI

module.exports = {
    PORT,
    mongoDB_URI
}