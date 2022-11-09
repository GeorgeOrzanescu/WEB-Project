import User from "../models/user.js";
import httpError from "http-errors";
import bcrypt from "bcrypt";

const _checkUserExists = async (userName) => {
  const user = await User.findOne({ where: { userName: userName } });
  if (user) {
    throw httpError(409, "A user with that name already exists");
  }
  return user;
};

const _checkUserCredentials = async (password, usersPassword) => {
  const isSame = await bcrypt.compare(password, usersPassword);
  if (!isSame) {
    throw httpError(403, "Incorrect username or password");
  }
};

const _getUserByName = async (username) => {
  const user = await User.findOne({ where: { userName: username } });
  if (!user) {
    throw httpError(404, "User not found");
  }
  return user;
};

export { _checkUserExists, _checkUserCredentials, _getUserByName };
