const Quotes = require('../models/quotes')

module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");

    server
        .get("/getQuote", quoteController.getRandomQuote)
        .get("/getAllQuotes", quoteController.getAllQuotes)
        .put("/quotes/:id", quoteController.updateQuotes)
        .post("/addCitation", quoteController.uploadCSV, quoteController.addQuoteCSV)
        .post("/addQuote", quoteController.addQuote)
        .delete("/quotes/:id", quoteController.deleteQuote)
}