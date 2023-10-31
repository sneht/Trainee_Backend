const { commonResponse } = require("../../helpers");
const holidayService = require("../Holidays/holiday.service");
const {
  holidayValidation,
  updateHolidayValidation,
  holidayListValidation,
} = require("./holiday.validator");
const router = require("express").Router();
const {
  STR_INTERNAL_SERVER_ERROR,
  STR_SOMETHING_WENT_WRONG,
  STR_HOLIDAY_ADDED_CAP,
  STR_HOLIDAY_ADDED_SUCCESSFULLY,
  STR_HOLIDAY_FOUND_CAP,
  STR_HOLIDAY_FOUND_SUCCESSFULLY,
  STR_HOLIDAY_DELETED_CAP,
  STR_HOLIDAY_DELETED_SUCCESSFULLY,
  STR_HOLIDAY_UPDATED_CAP,
  STR_HOLIDAY_UPDATED_SUCCESSFULLY,
} = require("../../utils/const");

// For Add Holidays
router.post("/", holidayValidation, async (req, res) => {
  try {
    const { body } = req || {};
    const { success, message, data } = await holidayService.create(body);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_HOLIDAY_ADDED_CAP,
        STR_HOLIDAY_ADDED_SUCCESSFULLY
      );
    } else {
      commonResponse.failure(res, message);
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

//  For Holidays List
router.get("/", holidayListValidation, async (req, res) => {
  try {
    let { success, message, data } = await holidayService.list(
      req.query.pagination
    );
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_HOLIDAY_FOUND_CAP,
        STR_HOLIDAY_FOUND_SUCCESSFULLY
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

// For Single Holiday
router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await holidayService.findOneHoliday(
      req.params.id
    );
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_HOLIDAY_FOUND_CAP,
        STR_HOLIDAY_FOUND_SUCCESSFULLY
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

// For Holiday Update By Id
router.put("/:id", updateHolidayValidation, async (req, res) => {
  try {
    let { success, message, data } = await holidayService.update(
      req.params.id,
      req.body
    );

    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_HOLIDAY_UPDATED_CAP,
        STR_HOLIDAY_UPDATED_SUCCESSFULLY
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

// For Delete Holiday By Id
router.delete("/:id", async (req, res) => {
  try {
    let { success, message, data } = await holidayService.delete(req.params.id);
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_HOLIDAY_DELETED_CAP,
        STR_HOLIDAY_DELETED_SUCCESSFULLY
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
