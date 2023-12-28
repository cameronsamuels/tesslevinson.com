const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
