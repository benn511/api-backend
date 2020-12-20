const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "db.sqlite" });
const router = express.Router();
var initModels = require("../models/init-models");

// load the model definitions into sequelize
var models = initModels(sequelize);

router.get("/ping", (req, res) => {
  res.status(200).send({ msg: "DB API successful ping" });
});

router.post("/create/event", (req, res) => {
  const { name, description, owner } = req.body;
  models.Event.findOrCreate({
    where: Sequelize.and({ event_name: name }, { event_owner: owner }),
    defaults: {
      event_name: name,
      event_description: description,
      event_owner: owner,
    },
  }).then(([event, created]) => {
    if (created) {
      res.status(200).send({ msg: "New event created", event_created: event });
    } else {
      res.status(400).send({
        msg: "Event already exists with that name",
        event_existing: event,
      });
    }
  });
});

router.get("/read/event", (req, res) => {
  models.Event.findAll().then((events) => {
    res.status(200).send({ events: events });
  });
});

router.get("/update/event", (req, res) => {
  res.json({ msg: "Update path" });
});

router.post("/update/event", (req, res) => {
  const { name, description, owner } = req.body;
  // Update name or desc
  models.Event.update(
    { event_name: name, event_description: description },
    {
      where: { event_name: name, event_owner: owner },
    }
  ).then(() => {
    // return update group as JSON
    models.Event.findOne({
      where: { event_name: name, event_owner: owner },
    }).then((event) => {
      res.json({ event: event, msg: `Updated event: ${name}` });
    });
  });
});

router.get("/destroy/event", (req, res) => {
  const { name, owner } = req.body;
  models.Event.destroy({
    where: { event_name: name, event_owner: owner },
  }).then((deleted) => {
    if (deleted) {
      res.status(200).send({ msg: `Successfully deleted: ${name}` });
    } else {
      res
        .status(200)
        .send({
          msg: `Group: ${name} does not exist or is missing correct parameter. `,
        });
    }
  });
});

module.exports = router;
