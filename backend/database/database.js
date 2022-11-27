import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  // persistent storage
  dialect: "sqlite",
  storage: "./db",
});

export default sequelize;
