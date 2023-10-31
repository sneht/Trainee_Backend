const joi = require("joi");
const { commonResponse } = require("../../helpers");
const {
  STR_REQUIRED_VALIDATION_CAP,
  STR_INTERNAL_SERVER_ERROR,
  STR_SOMETHING_WENT_WRONG,
} = require("../../utils/const");

exports.holidayValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      holiday_title: joi.string().required(),
      holiday_date: joi.string().required(),
      holiday_img: joi.string().required(),
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

exports.updateHolidayValidation = (req, res, next) => {
  try {
    const schema = joi
      .object({
        holiday_title: joi.string().trim().required(),
        holiday_date: joi.string().trim().required(),
        holiday_img: joi.string().required(),
      })
      .required();

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
exports.holidayListValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      pagination: joi.object({
        page: joi.number().integer().min(1).required(),
        rowsPerPage: joi.number().integer().min(1).required(),
      }),
      sortBy: joi.string().optional(),
      descending: joi.string().valid("asc", "desc").optional(),
    });
    let data = schema.validate(req.query);
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
