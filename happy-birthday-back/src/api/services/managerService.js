const Manager = require('../models/manager')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10; 

exports.verifyLogin = async (email, password) => {
    try {
        const manager = await Manager.findOne({ where: { email } });
        if (!manager) {
            return('Compte non trouvé');
        }
        
        const isPasswordValid = await bcrypt.compare(password, manager.password);
        if (!isPasswordValid) {
            return('Mot de passe incorrect');
        }
        return manager;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getCompteById = async (data) => {
    try {
        const manager = await Manager.findByPk(data.id, {
            attributes: ['id', 'firstname', 'lastname', 'email']
        });

        if (!manager) {
            throw new Error('Compte not found');
        }
        return manager;
    } catch (error) {
        throw new Error(error.message);
    }
}

// exports.createManager = async (data) => {
//     try {
//         const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
//         const manager = await Manager.create({ ...data, password: hashedPassword });
//         console.log(manager);
//         return manager;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }