const Manager = require('../models/manager')

module.exports = (server) => {
    const managerController = require("../controllers/managerController");

    server
        .post("/login", managerController.login)
    // server.post("/addManager", managerController.addManager)
}