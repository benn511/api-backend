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
  console.log(name, description, owner);
  //   res.status(200).send({ msg: "events" });
  models.Event.findOrCreate({
    where: Sequelize.and({ event_name: name }, { event_owner: owner }),
    defaults: {
      event_name: name,
      event_description: description,
      event_owner: owner,
    },
  }).then(([event, created]) => {
    if (created) {
      res.json({ msg: "New event created", event_created: event });
    } else {
      res.json({
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
  if (name && description && owner) {
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
  } else {
    res.json({
      error:
        "Invalid name, description, or owner. Cannot query without required body parameters.",
    });
  }
});

router.get("/destroy/event", (req, res) => {
  const { name, owner } = req.body;
  // if (name && owner) {

  // }
  res.json({ msg: "Current path for destroying event" });
});

module.exports = router;
