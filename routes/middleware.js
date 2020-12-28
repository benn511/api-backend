const url = require("url");

/* Checks for missing data needed to create new event */
const eventCreateErrors = (req, res, next) => {
  console.log("Passing through create errors");
  const { name, description, owner } = req.body;
  if (name && description && owner) {
    next();
  } else {
    //Allows for more specific error checking
    let errors = "Missing JSON data.";
    if (!name) errors += "Missing name.";
    if (!description) errors += "Missing description.";
    if (!owner) errors += "Missing owner.";
    res.status(206).send({ errors: { msg: errors } });
  }
};

/* Checks for missing id needed to update an event */
const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  const { id, owner, name, description } = req.body;
  if (id && (owner || name || description)) {
    next();
  } else if (id) {
    res.status(206).send({
      errors: { msg: "id passed but missing owner, name, or description." },
    });
  } else {
    res.status(206).send({ errors: { msg: "Cannot update without an id. " } });
  }
};

module.exports = { eventCreateErrors, eventUpdateErrors };
