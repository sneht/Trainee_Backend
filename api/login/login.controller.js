const { userLogin, adminLogin } = require("./login.service");
const { loginValidation } = require("./login.validator");
const router = require("express").Router();

router.post("/", loginValidation, async (req, res) => {
  try {
    const { success, message, data } = await userLogin(req.body);
    if (success) {
      const response = {
        success,
        data,
        message,
      };
      return res.status(200).send(response);
    } else {
      const response = {
        success,
        data,
        message,
      };
      return res.status(400).send(response);
    }
  } catch (err) {
    const error = {
      succuss: false,
      data: {},
      message: err.message || err,
    };
    return res.status(500).send(error);
  }
});


module.exports = router;
