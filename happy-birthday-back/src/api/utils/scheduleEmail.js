const cron = require('node-cron');
const { DateTime } = require('luxon');
const BirthdayMember = require('../models/birthday_user');
const transporter = require('../../config/nodemailer');
const birthdayEmailTemplate = require('../templates/birthdayEmail');

// Planifiez la tâche pour s'exécuter tous les jours à 8h GMT+1
cron.schedule('0 7 * * *', async () => {
  try {
    const todaysDate = DateTime.now().toFormat('MM-dd');

    const membersBirthday = await BirthdayMember.findAll({
      where: {
        birthday: {
          [Op.like]: `%${todaysDate}`
        }
      }
    });

    for (const member of membersBirthday) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: member.email,
        subject: 'Happy Birthday!',
        html: birthdayEmailTemplate(member.firstname)
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
  } catch (error) {
    console.error('Error checking birthdays:', error);
  }
});
