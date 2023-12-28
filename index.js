const express = require("express");
const layouts = require("express-ejs-layouts");
const router = require("./routes/index");

// Configure Express.js
const app = express();
app.set("view engine", "ejs");
app.use(layouts);

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Establish router and server
app.use("/", router);
const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
