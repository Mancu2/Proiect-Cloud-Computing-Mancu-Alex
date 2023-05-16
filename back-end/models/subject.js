module.exports = (sequelize, DataTypes) => {
  return sequelize.define("subject", {
    title: DataTypes.STRING,
  });
};
