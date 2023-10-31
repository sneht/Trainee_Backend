const registerController = require("../api/register/register.controller");
const loginController = require("../api/login/login.controller");
const holidayController = require("../api/Holidays/holiday.controller");
const imageController = require("../api/Image/image.controller");
const { isAuthorized } = require("../helpers/gaurds");

const initialize = (app) => {
  app.use("/api/user", isAuthorized, registerController);
  app.use("/api/login", loginController);
  app.use("/api/holiday", isAuthorized, holidayController);
  app.use("/api/image", isAuthorized, imageController);
};
module.exports = { initialize };
