const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ router: "helpers" });
});

module.exports = router;