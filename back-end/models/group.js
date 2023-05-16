module.exports = (sequelize, DataTypes) => {
  return sequelize.define("group", {
    name_group: DataTypes.STRING,
  });
};
