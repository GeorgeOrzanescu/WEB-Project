import User from "../models/user.js";
import httpError from "http-errors";
import bcrypt from "bcrypt";

/**
 * Checks if a user with a certain username exists
 * @param {String} userName - the username
 *
 * @returns - the user found or a HTTP error
 */
const _checkUserExists = async (userName) => {
  const user = await User.findOne({ where: { userName: userName } });
  if (user) {
    throw httpError(409, "A user with that name already exists");
  }
  return user;
};

/**
 * Cheks if the password received matches the one stored
 * @param {String} password - the received password
 * @param {String} usersPassword - the password stored in db
 */
const _checkUserCredentials = async (password, usersPassword) => {
  const isSame = await bcrypt.compare(password, usersPassword);
  if (!isSame) {
    throw httpError(403, "Incorrect username or password");
  }
};

/**
 *
 * @param {String} username - username
 *
 * @returns - the user found or a HTTP error
 */
const _getUserByName = async (username) => {
  const user = await User.findOne({ where: { userName: username } });
  if (!user) {
    throw httpError(404, "User not found");
  }
  return user;
};

/**
 *
 * @param {Number} id - the id of an user
 *
 * @returns - the user with all the favourite songs or a HTTP error
 */
const _getUserById = async (id) => {
  const user = await User.findOne({
    where: { id: id },
    include: "favouriteSongs",
  });
  if (!user) {
    throw httpError(404, "User not found");
  }
  return user;
};

export {
  _checkUserExists,
  _checkUserCredentials,
  _getUserByName,
  _getUserById,
};
