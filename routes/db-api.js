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
      res.status(409).send({
        errors: { msg: "Event already exists with name and owner" },
      });
    }
  });
});

/*@desc GRABS ALL EVENTS FROM DB 
 @route GET /db_api/read/events*/
router.get("/read/events", (req, res) => {
  models.Event.findAll().then((events) => {
    res.status(200).send({ events: events });
  });
});

/*@desc GRABS ONE EVENT FROM DB 
 @route GET /db_api/read/event/id*/
router.get("/read/event/:id", (req, res) => {
  if (req.params.id) {
    models.Event.findOne({ where: { event_id: req.params.id } })
      .then((event) => {
        if (event) {
          res.status(200).send({
            event: event,
            msg: "Successfully found an event with id passed",
          });
        } else {
          res.status(200).send({
            errors: { id: "Could not find event with id passed" },
          });
        }
      })
      .catch((err) => {
        res.status(200).send({ errors: { msg: err } });
      });
  } else {
    res.status(200).send({ errors: { id: "Invalid event id passed." } });
  }
});

/*@desc UPDATE 1 EVENT REQUIRES: NAME & OWNER 
 @route POST /db_api/update/event */
router.put("/update/event", (req, res) => {
  const { id, owner, name, description } = req.body;

  // Update specific event to new changes
  models.Event.update(
    { event_name: name, event_description: description, event_owner: owner },
    {
      where: { event_id: id },
    }
  ).then((result) => {
    console.log("Result of update: ", result);
    // return update group as JSON
    models.Event.findOne({
      where: { event_id: id },
    }).then((event) => {
      if (event) {
        res.status(200).send({
          event: event,
          msg: `Updated event with id: ${event.event_id}`,
        });
      } else {
        res.status(200).send({ msg: `Could not find event with id: ${id}` });
      }
    });
  });
});

/*@desc Error check 
 @route GET /db_api/destroy/event/ */
router.delete("/destroy/event/", (req, res) => {
  res
    .status(200)
    .send({ msg: "Missing parameter. Please pass an id to delete event." });
});

/*@desc Deletes an entry from DB 
 @route GET /db_api/destroy/event/:id */
router.delete("/destroy/event/:id", (req, res) => {
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
