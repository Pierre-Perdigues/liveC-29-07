const BirthdayMember = require('../models/birthday_user')

module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayController");

    server
        .get("/getBirthday", birthdayController.getTodaysBirthday)
        .post("/addBirthday", birthdayController.uploadCSV ,birthdayController.addBirthday)
        // .get("/sendBirthdayEmail", birthdayController.sendBirthdayEmail);
}