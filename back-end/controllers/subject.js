const SubjectDb = require("../models").Subject;
const NoteDb = require("../models").Note;

const controller = {
  addSubject: (req, res) => {
    const { title } = req.body;
    SubjectDb.create({ title })
      .then((subject) => {
        res.status(201).send(subject);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },

  getAllSubjects: async (req, res) => {
    SubjectDb.findAll({ include: [{ model: NoteDb, as: "Notes" }] })
      .then((subjects) => {
        res.status(200).send(subjects);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getSubjectById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    SubjectDb.findByPk(id)
      .then((subject) => {
        res.status(200).send(subject);
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneSubject: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let subject = await SubjectDb.findByPk(id);
      if (!subject) throw new Error("nu exista");

      let old_subject = await subject.destroy();
      res.status(205).send(old_subject);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Subject cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },
};

module.exports = controller;
