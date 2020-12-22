const url = require("url");
const eventCreateErrors = (req, res, next) => {
  console.log("Passing through create errors");
  const { name, description, owner } = req.body;
  if (name && description && owner) {
    next();
  } else {
    let errors = "Problem with body parameters. Missing JSON data. ";
    if (!name) errors += " Missing name. ";
    if (!description) errors += "Missing description. ";
    if (!owner) errors += "Missing owner. ";
    res.status(200).send({ msg: errors });
  }
};

const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  const { id, owner, name, description } = url.parse(req.url, true).query;
  // I need an id for sure
  if (id && (owner || name || description)) {
    next();
  } else if (id) {
    res.status(200).send({
      msg: "id passed but missing owner, name, or description to update.",
    });
  } else {
    res.status(200).send({ msg: "Cannot update without an id. " });
  }
  // next();
};

// C U D Error checking
module.exports = { eventCreateErrors, eventUpdateErrors };
