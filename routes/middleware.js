const url = require("url");
const eventCreateErrors = (req, res, next) => {
  const { name, description, owner } = req.body;
  console.log("Passing through create errors");
  if (name && description && owner) {
    next();
  } else {
    res.status(200).send({ msg: "Problem with body parameters. Retry." });
  }
};

const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  const parameters = url.parse(req.url, true).query;
  // I need an id for sure
  if (parameters.id) {
    next();
  } else {
    res.status(200).send({ msg: "Cannot update without an id. " });
  }
  console.log(parameters);
  next();
};

// C U D Error checking
module.exports = { eventCreateErrors, eventUpdateErrors };
