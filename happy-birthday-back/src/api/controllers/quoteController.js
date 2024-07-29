const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Quotes = require('../models/quotes'); 

const upload = multer({ dest: 'uploads/' });
exports.uploadCSV = upload.single('file');

const parseService = require('../services/parseServiceQuote');
const CSV_QUOTES = 'quotes.csv';
// exports.getRandomQuote = async (req, res) => {
//   const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
//   res.json({ ...TODAYS_QUOTE });
// };

exports.getRandomQuote = async (req, res) => {
  try {
    // Récupérer toutes les citations
    const quotes = await Quotes.findAll();
    if (quotes.length === 0) {
      return res.status(404).json({ error: 'No quotes found' });
    }

    // Sélectionner une citation aléatoire
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addQuote = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, '../../', req.file.path);
  console.log(filePath);

  try {
    const results = await parseService.parseFile(filePath);
    for (const row of results) {
      await Quotes.create({
        quote: row.quote,
        author: row.author,
      });
    }
    fs.unlinkSync(filePath); // Supprimer le fichier après traitement
    res.status(200).send('File processed successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing file');
  }
};