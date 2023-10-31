const joi = require("joi");
const {
  STR_REQUIRED_VALIDATION_CAP,
  STR_SOMETHING_WENT_WRONG,
  STR_INTERNAL_SERVER_ERROR,
} = require("../../utils/const");
const { commonResponse } = require("../../helpers");

exports.departmentValidation = (req, res, next) => {
  try {
    const schema = joi
      .object({
        department_name: joi.string().required().trim(),
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

exports.departmentUpdateValidation = (req, res, next) => {
  try {
    const schema = joi
      .object({
        department_name: joi.string().trim().required(),
        isActive: joi.boolean().required(),
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

exports.departmentListValidation = (req, res, next) => {
  try {
    const schema = joi
      .object({
        pagination: joi.object({
          page: joi.number().integer().min(1).allow().optional(),
          rowsPerPage: joi.number().integer().min(1).allow().optional(),
        }),
        search: joi.object({
          department_name: joi.string().allow("").optional(),
        }),
        filter: joi.object({
          isActive: joi.boolean().allow("").optional(),
        }),
        sortBy: joi.object({
          createdAt: joi.string().allow("").optional(),
          department_name: joi.string().allow("").optional(),
        }),
      })
      .required();
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

exports.singleDepartmentValidation = (req, res, next) => {
  try {
    const schema = joi
      .object({
        // id: joi.string().guid({ version: 'uuidv4' }).required()
        id: joi.number().required(),
      })
      .required();
    let data = schema.validate(req.params);
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
