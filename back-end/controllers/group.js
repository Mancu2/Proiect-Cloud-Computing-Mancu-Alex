const GroupDb = require("../models").Group;

const controller = {
  addGroup: (req, res) => {
    const { name_group } = req.body;
    GroupDb.create({ name_group })
      .then((group) => {
        res.status(201).send(group);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },
  getAllGroups: async (req, res) => {
    GroupDb.findAll()
      .then((groups) => {
        res.status(200).send(groups);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getGroupById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    GroupDb.findByPk(id)
      .then((group) => {
        res.status(200).send({ group });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneGroup: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let group = await GroupDb.findByPk(id);
      if (!group) throw new Error("nu exista");

      let old_group = await group.destroy();
      res.status(205).send(old_group);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Groupe cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },
};

module.exports = controller;
