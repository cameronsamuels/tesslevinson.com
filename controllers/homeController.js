const errorController = require("./errorController.js");

const createPageTitle = (title) => {
    title = title.substring(0, 1).toUpperCase() + title.substring(1);
    return title + " | Tess Levinson";
}

module.exports = {

    // Renders the home page
    respondWithHomePage: (req, res) => {
        res.render("index", {
            title: createPageTitle("home")
        });
    },

    // Dynamically respond with a view from any requests at the root
    // Include params for a stylesheet of the same name as the view
    // Handle a 404 error if the view does not exist.
    respondWithView: (req, res) => {
        res.render(req.params.page, {
            title: createPageTitle(req.params.page)
        }, function(err, html) {
            if (err) {
                if (err.message.includes('Failed to lookup view'))
                    errorController.respondNoResourceFound(req, res);
                throw err;
            }
            res.send(html);
        });
    },

    // Standardize the <title> of a view when sending as a param
    createPageTitle: createPageTitle,

};
