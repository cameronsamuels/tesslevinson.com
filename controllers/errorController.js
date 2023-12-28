const httpStatus = require("http-status-codes");

module.exports = {

    // Respond to 404 errors with status code and page view
    respondNoResourceFound: (req, res) => {
        let errorCode = httpStatus.StatusCodes.NOT_FOUND;
        res.status(errorCode);
        res.render("404", {
            title: "404 | Page Not Found",
        });
    },

    // Respond to 500 errors with status code and page view
    internalServerError: (error, req, res) => {
        let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
        console.log(`ERROR Occurred ${error.stack}`);
        res.status(errorCode);
        res.render("500", {
            title: "500 | Internal Server Error",
        });
    },

};
