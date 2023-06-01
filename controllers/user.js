const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')

module.exports.getALL = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        throw error;
    }
};

module.exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        // save user token
        user.token = generateToken(user._id);
        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        const isValidPass = await bcrypt.compare(password, user.password);
        if (user && (isValidPass)) {
            // save user token
            user.token = generateToken(user._id);
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
}