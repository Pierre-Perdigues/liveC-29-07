const jwtToken = require('../utils/generateToken');
const ManagerService = require('../services/managerService')


exports.login = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    var id = await ManagerService.verifyLogin(email, password)
    if (id) {
        const userPayload = await ManagerService.getCompteById(id);
        console.log('userPayload');
        res.status(201).json(jwtToken.generateToken(userPayload.dataValues)); 
    } else {
        throw new Error('Invalid credentials');
    }
};

// exports.addManager = async (req, res) => {
//     try {
//         const manager = await ManagerService.createManager(req.body);
//         res.status(201).json(manager);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }