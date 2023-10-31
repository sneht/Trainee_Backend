const { commonResponse } = require("../../helpers");
const {
  STR_USER_CREATED_CAP,
  STR_USER_ADDED_SUCCESSFULLY,
  STR_ALREADY_EXISTS_CAP,
  STR_SOMETHING_WENT_WRONG,
  STR_INTERNAL_SERVER_ERROR,
  STR_EMPLOYEE_FOUND_SUCCESSFULLY,
  STR_EMPLOYEE_FOUND_CAP,
  STR_EMPLOYEE_UPDATED_CAP,
  STR_EMPLOYEE_UPDATED_SUCCESSFULLY,
  STR_EMPLOYEE_DELETED_SUCCESSFULLY,
  STR_EMPLOYEE_DELETED_CAP,
} = require("../../utils/const");
const {
  registerUser,
  findAllUsers,
  findUserById,
  findAndUpdateUserById,
  findAndDeleteUser,
} = require("./register.service");
const { addUserValidation } = require("./register.validator");

const router = require("express").Router();

router.post("/", addUserValidation, async (req, res) => {
  try {
    const { body } = req || {};
    const { success, message, data } = await registerUser(body);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_USER_CREATED_CAP,
        STR_USER_ADDED_SUCCESSFULLY
      );
    } else if (message === STR_ALREADY_EXISTS_CAP) {
      return commonResponse.keyAlreadyExist(
        res,
        message,
        req.languageCode,
        400
      );
    } else {
      return commonResponse.failure(res, message);
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
});

router.get("/", async (req, res) => {
  try {
    const { userDetails, query } = req || {};
    const { search } = query || {};
    const { success, message, data } = await findAllUsers(search, userDetails);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_EMPLOYEE_FOUND_CAP,
        STR_EMPLOYEE_FOUND_SUCCESSFULLY
      );
    } else {
      return commonResponse.failure(res, message);
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
});

router.get("/:id", async (req, res) => {
  try {
    const { params } = req || {};
    const { id } = params || {};
    const { success, message, data } = await findUserById(id);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_EMPLOYEE_FOUND_CAP,
        STR_EMPLOYEE_FOUND_SUCCESSFULLY
      );
    } else {
      return commonResponse.failure(res, message);
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
});

router.patch("/:id", async (req, res) => {
  try {
    const { params, body } = req || {};
    const { id } = params || {};
    const { success, message, data } = await findAndUpdateUserById(id, body);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_EMPLOYEE_UPDATED_CAP,
        STR_EMPLOYEE_UPDATED_SUCCESSFULLY
      );
    } else {
      return commonResponse.failure(res, message);
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
});

router.delete("/:id", async (req, res) => {
  try {
    const { params } = req || {};
    const { id } = params || {};
    const { success, message, data } = await findAndDeleteUser(id);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_EMPLOYEE_DELETED_CAP,
        STR_EMPLOYEE_DELETED_SUCCESSFULLY
      );
    } else {
      return commonResponse.failure(res, message);
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
});

module.exports = router;
