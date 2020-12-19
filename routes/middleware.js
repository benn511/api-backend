const eventUpdateErrors = (req, res, next) => {
  console.log("Passed thru middleware");
  next();
};

module.exports = { eventUpdateErrors };
