const BirthdayMember = require('../models/birthday_user')

module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayController");

    server
        .get("/getBirthday", birthdayController.getTodaysBirthday)
        .get("/getAllBirthdays", birthdayController.getAllBirthday)
        .put("/updateBirthdays/:id", birthdayController.updateBirthday)
        .post("/addBirthday",birthdayController.addBirthday)
        .post("/addBirthdayCSV", birthdayController.uploadCSV ,birthdayController.addBirthdayCSV)
        .delete("/deleteBirthdays/:id", birthdayController.deleteBirthday)
        // .get("/sendBirthdayEmail", birthdayController.sendBirthdayEmail);
}