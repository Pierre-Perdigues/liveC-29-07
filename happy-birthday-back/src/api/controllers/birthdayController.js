const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BirthdayMember = require('../models/birthday_user'); 
const { Op, Sequelize  } = require('sequelize');

const upload = multer({ dest: 'uploads/' });

exports.uploadCSV = upload.single('file');

const CSV_STUDENTS = "students.csv";
const CSV_TEACHERS = "intervenants.csv";

exports.getAllBirthday = async (req, res) => {
  try {
    // Récupérer toutes les citations
    const birthday = await BirthdayMember.findAll();
    if (birthday.length === 0) {
      return res.status(404).json({ error: 'No quotes found' });
    }
    res.json(birthday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBirthday = async (req, res) => {
  try {
    // Récupérer toutes les citations
    const birthday = await BirthdayMember.findByPk(req.params.id);
    if (!birthday) {
      throw new Error('Compte not found');
    }
    console.log(req.body);
    await birthday.update(req.body)
    res.json(birthday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBirthday = async (req, res) => {
  try {
    // Récupérer toutes les citations
    const birthday = await BirthdayMember.findByPk(req.params.id);
    if (!birthday) {
      throw new Error('Compte not found');
    }
    await birthday.destroy()
    res.json("delete");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBirthday = async (req, res) => {
  try {
    console.log(req.body);
    await BirthdayMember.create(req.body);
    res.status(200).json('create');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing file');
  }
};

exports.getTodaysBirthday = async (req, res) => {
  try {
    const todaysDate = DateTime.now().toFormat('MM-dd'); // Format mois-jour

    // Récupérer tous les membres dont l'anniversaire est aujourd'hui sans l'année
    const membersBirthday = await BirthdayMember.findAll({
      where: Sequelize.where(
        Sequelize.fn('DATE_FORMAT', Sequelize.col('birthday'), '%m-%d'),
        todaysDate
      )
    });

    res.json({
      count_total: membersBirthday.length,
      members_birthday: membersBirthday
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
  

exports.addBirthdayCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
    
      const filePath = path.join(__dirname, '../../', req.file.path);
      console.log(filePath);
    
      try {
        const results = await parseService.parseFile(filePath);
        for (const row of results) {
          await BirthdayMember.create({
            birthday: new Date(row.birthday),
            lastname: row.lastname,
            firstname: row.firstname,
            email: row.email,
          });
        }
        fs.unlinkSync(filePath); // Supprimer le fichier après traitement
        res.status(200).send('File processed successfully');
      } catch (error) {
        console.log(error);
        res.status(500).send('Error processing file');
      }
}