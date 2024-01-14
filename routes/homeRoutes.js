const homeController = require("../controllers/homeController");
const router = require("express").Router();

router.get("/", homeController.respondWithHomePage);
router.post("/contact", homeController.receiveContactMessage);
router.get("/:page", homeController.respondWithView);

module.exports = router;
