import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { __SECRET_KEY__ } from "../environment/envVariables.js";
import {
  _checkUserCredentials,
  _checkUserExists,
  _getUserByName,
} from "../database/databaseService.js";

/**
 * Handles the POST register user
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // check if user is already registered
    await _checkUserExists(userName);

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // generate the hashed password
    const hashedPassword = await bcrypt.hash(password, salt);
    //saving the user
    const user = await User.create({
      userName: userName,
      password: hashedPassword,
    });
    // set cookie with the token generated
    let token = jwt.sign({ id: user.id }, __SECRET_KEY__, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("jwt", token, { maxAge: 7 * 24 * 60 * 60, httpOnly: true });
    //send users details
    // TODO : create a model to send (only some info)
    return res.status(201).send(user);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
  next();
};

/**
 * Handles the POST login user
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    //check if a user with that name exists
    const user = await _getUserByName(userName);
    // check password
    await _checkUserCredentials(password, user.password);

    //if user userName is found, compare password with bcrypt
    let token = jwt.sign({ id: user.id }, __SECRET_KEY__, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    //generate a cookie for the user
    res.cookie("jwt", token, { maxAge: 7 * 24 * 60 * 60, httpOnly: true });
    console.log("user", JSON.stringify(user, null, 2));
    //send user data
    // TODO : create a model to send (only some info)
    return res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
  next();
};

export { register, login };
