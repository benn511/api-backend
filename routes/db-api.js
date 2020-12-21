const express = require("express");
const url = require("url");
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
      res.status(200).send({ msg: "New event created", event: event });
    } else {
      res.status(200).send({
        msg: "Event already exists with that name",
        event: event,
      });
    }
  });
});

/*@desc GRABS ALL EVENTS FROM DB 
 @route GET /db_api/read/events*/
router.get("/read/event", (req, res) => {
  models.Event.findAll().then((events) => {
    res.status(200).send({ events: events });
  });
});

/*@desc GRABS ONE EVENT FROM DB 
 @route GET /db_api/read/event/id*/
router.get("/read/event", (req, res) => {
  models.Event.findAll().then((events) => {
    res.status(200).send({ events: events });
  });
});

/*@desc UPDATE 1 EVENT REQUIRES: NAME & OWNER 
 @route POST /db_api/update/event */
router.post("/update/event", (req, res) => {
  //Destructure out params for query
  const { id, owner, name, description } = url.parse(req.url, true).query;

  // Update specific event to new changes
  models.Event.update(
    { event_name: name, event_description: description, event_owner: owner },
    {
      where: { event_id: id },
    }
  ).then(() => {
    // return update group as JSON
    models.Event.findOne({
      where: { event_id: id },
    }).then((event) => {
      if (event) {
        res
          .status(200)
          .send({ event: event, msg: `Updated event: ${event.name}` });
      } else {
        res.status(200).send({ msg: `Could not find event with id: ${id}` });
      }
    });
  });
});

router.get("/destroy/event/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    models.Event.destroy({
      where: { event_id: id },
    }).then((numDeleted) => {
      if (numDeleted) {
        res
          .status(200)
          .send({ msg: `Successfully deleted event with id: ${id}` });
      } else {
        res.status(200).send({
          msg: `event_id: ${id} does not exist. `,
        });
      }
    });
  } else {
    res.status(200).send({ msg: "Cannot delete without id." });
  }
});

module.exports = router;
