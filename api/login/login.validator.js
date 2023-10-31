const joi = require("joi");

exports.loginValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });
    let data = schema.validate(req.body);
    if (data.hasOwnProperty("error")) {
      const joiErr = {
        message: data.error,
      };
      return res.status(500).send(joiErr);
    } else {
      next();
    }
  } catch (err) {
    return res.staus(500).send(err.message);
  }
};
