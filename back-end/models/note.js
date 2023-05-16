module.exports = (sequelize, DataTypes) => {
  return sequelize.define("note", {
    text: DataTypes.STRING,
    active_note: DataTypes.BOOLEAN,
    // createdAt: {
    //   type: DataTypes.DATE,
    //   get() {
    //     return moment(this.getDataValue("createdAt")).format(
    //       "DD/MM/YYYY h:mm:ss"
    //     );
    //   },
    // },
  });
  // aici teoretic mai am nevoie de un id_user, id_subject si un id_attachment
};
