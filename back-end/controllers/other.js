const UserDb = require("../models").User;
const SubjectDb = require("../models").Subject;
const NoteDb = require("../models").Note;
const Db = require("../config/db");
const queryInterface = Db.getQueryInterface();
const connection = require("../models").connection;
const { DataTypes } = require("sequelize");

const controller = {
    resetDb: async (req, res) => {
        connection
            .sync({
                force: true,
            })
            .then(() => {
                queryInterface.addColumn("users_acces", "status_user", {
                    type: DataTypes.STRING,
                });
                UserDb.create({
                    email: "alex.mancu@stud.ase.ro",
                    password: "123456",
                });
                UserDb.create({
                    email: "john.snow@stud.ase.ro",
                    password: "123456",
                });
                UserDb.create({
                    email: "hello.world@stud.ase.ro",
                    password: "123456",
                });
                SubjectDb.create({ title: "History" });
                SubjectDb.create({ title: "Computer Science" });
                SubjectDb.create({ title: "Data Science" });
                NoteDb.create({
                    text: "Lorem Ipsum",
                    active_note: true,
                    userId: 1,
                    subjectId: 1,
                });
                NoteDb.create({
                    text: "Lorem Ipsum",
                    active_note: true,
                    userId: 2,
                    subjectId: 2,
                });
                NoteDb.create({
                    text: "Lorem Ipsum",
                    active_note: true,
                    userId: 3,
                    subjectId: 3,
                });

                res.status(201).send({ message: "Database reset!" });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Database reset failed",
                    err: err.message,
                });
            });
    },
};

module.exports = controller;
