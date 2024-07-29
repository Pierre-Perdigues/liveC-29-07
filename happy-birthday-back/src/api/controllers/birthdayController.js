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

// exports.getTodaysBirthday = async (req, res) => {
//     const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL'); //=> '2014 août 06'

//     const STUDENTS_BIRTHDAY = await parseService.parseFile(CSV_STUDENTS)
//     .then(students => {
//         return result = students.filter(student => student.birthday.startsWith(todaysDate));
//     });

//     const TEACHERS_BIRTHDAY = await parseService.parseFile(CSV_TEACHERS)
//     .then(students => {
//         return result = students.filter(student => student.birthday.startsWith(todaysDate));
//     });

//     res.json({
//         count_total: STUDENTS_BIRTHDAY.length + TEACHERS_BIRTHDAY.length,
//         students_birthday : STUDENTS_BIRTHDAY,
//         teachers_birthday : TEACHERS_BIRTHDAY
//     })
// }

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

  
  

exports.addBirthday = async (req, res) => {
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