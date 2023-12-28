const express = require("express");

// Configure Express.js
const app = express();
app.set("port", process.env.PORT || 3000);

// Establish router and server
app.use("/", router);
const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
