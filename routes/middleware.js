const url = require("url");
const eventCreateErrors = (req, res, next) => {
  console.log("Passing through create errors");
  const { name, description, owner } = req.body;
  if (name && description && owner) {
    next();
  } else {
    let errors = "Missing JSON data.";
    if (!name) errors += "Missing name.";
    if (!description) errors += "Missing description.";
    if (!owner) errors += "Missing owner.";
    res.status(206).send({ errors: { msg: errors } });
  }
};

const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  const { id, owner, name, description } = req.body;
  // I need an id for sure
  if (id && (owner || name || description)) {
    next();
  } else if (id) {
    res.status(206).send({
      errors: { msg: "id passed but missing owner, name, or description." },
    });
  } else {
    res.status(206).send({ errors: { msg: "Cannot update without an id. " } });
  }
  // next();
};

// C U D Error checking
module.exports = { eventCreateErrors, eventUpdateErrors };
