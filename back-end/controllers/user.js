const UserDb = require("../models").User;
const NoteDb = require("../models").Note;

const controller = {
  userAuth: async (req, res) => {
    const { email, password } = req.body;

    try {
      let query = await UserDb.findOne({
        where: { email: email, password: password },
      });

      if (query) {
        res.status(201).send({ message: "Autentificare cu succes!" });
      } else {
        res.status(404).send({ message: "Email sau parola gresite!" });
      }
    } catch (err) {
      res.status(500).send({ message: "Eroare la server!" });
    }
  },

  getAllUsers: (req, res) => {
    UserDb.findAll({ include: [{ model: NoteDb, as: "Notes" }] })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },
};

module.exports = controller;
