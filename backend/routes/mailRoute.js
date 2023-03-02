const Router = require("express").Router();
const { sendMail } = require("../controllers/mailController");

Router.route("/").post(sendMail);

module.exports = Router;
