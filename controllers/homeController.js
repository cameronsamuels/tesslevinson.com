const errorController = require("./errorController.js");
const sgMail = require('@sendgrid/mail');

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
            title: createPageTitle(req.params.page),
            message: {},
            fail: false
        }, function(err, html) {
            if (err) {
                if (err.message.includes('Failed to lookup view'))
                    errorController.respondNoResourceFound(req, res);
                throw err;
            }
            res.send(html);
        });
    },

    // Receive and log data from contact form, rendering a confirmation page
    receiveContactMessage: (req, res) => {
        console.log(req.body);

        const msg = {
            to: process.env.CONTACT_EMAIL,
            from: 'biz@cameronsamuels.com',
            subject: "Contact Form Submission",
            text: `Message from ${req.body.fullName}, ${req.body.email}:\n\n${req.body.message}`,
        }
        try {
            sgMail.send(msg);
            res.render("confirmation", {
                title: createPageTitle("contact"),
                message: msg.text
            });
        } catch (error) {
            console.log(error);
            res.render("contact", {
                title: createPageTitle("contact"),
                fail: true,
                message: {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    message: req.body.message
                }
            });
        }

    },

    // Standardize the <title> of a view when sending as a param
    createPageTitle: createPageTitle,

};
