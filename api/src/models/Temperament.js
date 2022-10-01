const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "temperament",
      name: {
        singular: "temperament",
        plural: "temperament",
      },
    }
  );
};
