const eventCreateErrors = (req, res, next) => {
  const { name, description, owner } = req.body;
  console.log("Passing through create errors");
  if (name && description && owner) {
    next();
  } else {
    res.status(400).send({ msg: "Problem with body parameters. Retry." });
  }
};

const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  next();
};

const eventDestroyErrors = (req, res, next) => {
  console.log("Passing thru destroy middleware");
  const { name, owner } = req.body;
  if (name && owner) {
    next();
  } else {
    res.status(400).send({ msg: "Error with name or owner" });
  }
};

// C U D Error checking
module.exports = { eventCreateErrors, eventUpdateErrors, eventDestroyErrors };
