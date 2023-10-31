const joi = require("joi");
const { commonResponse } = require("../../helpers");
const {
  STR_REQUIRED_VALIDATION_CAP,
  STR_INTERNAL_SERVER_ERROR,
  STR_SOMETHING_WENT_WRONG,
  STR_MALE_CAP,
  STR_FEMALE_CAP,
  STR_OTHER_CAP,
} = require("../../utils/const");

exports.addUserValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      gender: joi
        .string()
        .valid(STR_MALE_CAP, STR_FEMALE_CAP, STR_OTHER_CAP)
        .required(),
      joining_date: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      mobile_number: joi.string().required(),
      department: joi.string().required(),
      role: joi.string().required(),
      address: joi.string().required(),
      birth_date: joi.string().required(),
    });
    let data = schema.validate(req.body);
    if (data.hasOwnProperty("error")) {
      return commonResponse.sendJoiError(
        res,
        STR_REQUIRED_VALIDATION_CAP,
        "",
        data.error
      );
    } else {
      next();
    }
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return commonResponse.sendUnexpected(
      res,
      null,
      STR_INTERNAL_SERVER_ERROR,
      message
    );
  }
};
