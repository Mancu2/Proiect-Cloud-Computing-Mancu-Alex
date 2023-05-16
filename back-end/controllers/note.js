const NoteDb = require("../models").Note;
const UserDb = require("../models").User;

const controller = {
  addNote: (req, res) => {
    const { text, active_note, userId, subjectId } = req.body;
    UserDb.findByPk(userId)
      .then((user) => {
        if (user) {
          user
            .createNote({ text, active_note, subjectId })
            .then((note) => {
              res.status(201).send(note);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: "Eroare de sv!" });
            });
        } else {
          res.status(404).send({ message: "User id-ul nu exista!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },

  updateNote: (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "Trebuie sa specifici id-ul!" });
    }

    const { text, subjectId } = req.body;
    if (!text && !subjectId) {
      res
        .status(400)
        .send({ message: "Trebuie sa specifici minim o modificare!" });
    } else {
      NoteDb.findByPk(id)
        .then(async (note) => {
          if (note) {
            Object.assign(note, req.body);
            await note.save();
            res
              .status(202)
              .send({ message: "Note-ul a fost actualizata cu succes!" });
          } else {
            res.status(404).json({ message: "Note-ul nu exista!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Eroare de server!" });
        });
    }
  },

  getAllNotes: async (req, res) => {
    NoteDb.findAll()
      .then((notes) => {
        res.status(200).send(notes);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getNoteById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    NoteDb.findByPk(id)
      .then((note) => {
        res.status(200).send({ note });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneNote: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let note = await NoteDb.findByPk(id);
      if (!note) throw new Error("nu exista");

      let old_note = await note.destroy();
      res.status(205).send(old_note);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Note cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },
};

module.exports = controller;
