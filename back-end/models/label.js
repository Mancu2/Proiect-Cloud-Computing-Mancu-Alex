module.exports = (sequelize, DataTypes) => {
  return sequelize.define("label", {
    title: DataTypes.STRING,
  });
};
