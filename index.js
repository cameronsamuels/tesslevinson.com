require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = require("./routes/index");
const sgMail = require('@sendgrid/mail');

// Configure Express.js
const app = express();
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method", {
    methods: ["POST", "GET"],
}));

// Establish router and server
app.use("/", router);
const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
