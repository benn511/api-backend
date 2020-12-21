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
  const { id, owner, name, description } = url.parse(req.url, true).query;
  // I need an id for sure
  if (id && (owner || name || description)) {
    // res
    //   .status(200)
    //   .send({
    //     msg: "Successful request to update",
    //     id: id,
    //     owner: owner,
    //     name: name,
    //     description: description,
    //   });
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
