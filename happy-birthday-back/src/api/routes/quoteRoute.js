const Quotes = require('../models/quotes')

module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");

    server
        .get("/getQuote", quoteController.getRandomQuote)
        .post("/addCitation", quoteController.uploadCSV, quoteController.addQuote)
}