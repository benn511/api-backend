var express = require("express");
var router = express.Router();
/*@desc Checks to see if api is currently running 
 @route GET e.g. /api/ping */
router.get("/ping", (req, res) => {
  res.json({ success: true });
});

router.get("/read", (req, res) => {});

module.exports = router;
