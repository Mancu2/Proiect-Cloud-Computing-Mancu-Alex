const { Sequelize } = require("sequelize");

const Db = require("../config/db");
const UserModel = require("./user");
const SubjectModel = require("./subject");
const NoteModel = require("./note");
const LabelModel = require("./label");
const GroupModel = require("./group");

const User = UserModel(Db, Sequelize);
const Subject = SubjectModel(Db, Sequelize);
const Note = NoteModel(Db, Sequelize);
const Label = LabelModel(Db, Sequelize);
const Group = GroupModel(Db, Sequelize);

// FK userId pentru tabela Notes
User.hasMany(Note, {
  foreignKey: "userId",
  as: "Notes",
  onDelete: "CASCADE",
});
Note.belongsTo(User);

// FK subjectId pentru tabela Notes
Subject.hasMany(Note, {
  foreignKey: "subjectId",
  as: "Notes",
  onDelete: "CASCADE",
});
Note.belongsTo(Subject);

// Many TO Many intre tabela Labels Si Notes
Note.belongsToMany(Label, {
  through: "Notes_Labels",
  foreignKey: "noteId",
});

Label.belongsToMany(Note, {
  through: "Notes_Labels",
  foreignKey: "labelId",
});

// Many TO Many intre Notes si Groups
Note.belongsToMany(Group, {
  through: "Notes_Groups",
  foreignKey: "noteId",
});

Group.belongsToMany(Note, {
  through: "Notes_Groups",
  foreignKey: "groupId",
});

// Many TO Many intre Groups si Users
Group.belongsToMany(User, {
  through: "Users_Groups",
  foreignKey: "groupId",
});

User.belongsToMany(Group, {
  through: "Users_Groups",
  foreignKey: "userId",
});

// Many TO Many intre Users si Notes
Note.belongsToMany(User, {
  through: "Users_Acces",
  foreignKey: "noteId",
});

User.belongsToMany(Note, {
  through: "Users_Acces",
  foreignKey: "userId",
});

module.exports = {
  User,
  Subject,
  Note,
  Label,
  Group,
  connection: Db,
};
