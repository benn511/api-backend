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
  next();
};

// C U D Error checking
module.exports = { eventCreateErrors, eventUpdateErrors };
