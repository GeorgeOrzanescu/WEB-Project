//importing modules
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import {__SECRET_KEY__} from "../environment/envVariables.js";


// register a new user
// TODO: create a middleware or service to check if a user is already registered
const register = async (req, res, next) => {
    try {
        const {userName, password} = req.body;

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // generate the hashed password
        const hashedPassword = await bcrypt.hash(password, salt);
        //saving the user
        const user = await User.create({
            userName: userName,
            password: hashedPassword
        });

        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({id: user.id}, __SECRET_KEY__, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, {maxAge: 7 * 24 * 60 * 60, httpOnly: true});
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            // TODO : create a model to send (only some info)
            return res.status(201).send(user);
        } else {
            // TODO: make standard error messages
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//user logs in
const login = async (req, res) => {
    try {
        const {userName, password} = req.body;

        //find a user by their userName
        const user = await User.findOne({where: {userName: userName}});

        //if user userName is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({id: user.id}, __SECRET_KEY__, {
                    expiresIn: 7 * 24 * 60 * 60 * 1000,
                });

                //if password matches with the one in the database
                //generate a cookie for the user
                res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60, httpOnly: true});
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                // TODO : create a model to send (only some info)
                return res.status(201).send(user);
            } else {
                // TODO: make standard error messages
                return res.status(401).send("Authentication failed");
            }
        } else {
            // TODO: make standard error messages
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    register,
    login
}