//importing modules
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import {__SECRET_KEY__} from "../environment/envVariables.js";


//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res,next) => {
    try {
        const { userName, password } = req.body;
        //saving the user
        const user = await User.create({userName,password});


        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);

        console.log(salt)


        //if user details is captured
        //generate token with the user's id and the secretKey in the envVariables file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, __SECRET_KEY__, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
            next();
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        //find a user by their userName
        const user = await User.findOne(userName);

        //if user userName is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, __SECRET_KEY__, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    signup,
    login
}