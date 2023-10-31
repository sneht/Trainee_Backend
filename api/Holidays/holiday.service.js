const Holiday = require("../../models/holiday.model");
const pagination = require("../../helpers/pagination");
const { v4: holidayId } = require("uuid");
const moment = require("moment");
const {
  STR_HOLIDAY_ADDED_SUCCESSFULLY,
  STR_SOMETHING_WENT_WRONG,
  STR_HOLIDAY_ALREADY_EXIST,
  STR_HOLIDAY_FOUND_SUCCESSFULLY,
  STR_HOLIDAY_DOESNT_EXIST,
  STR_HOLIDAY_UPDATED_SUCCESSFULLY,
  STR_HOLIDAY_DELETED_SUCCESSFULLY,
} = require("../../utils/const");

// For Add Holiday
exports.create = async (body) => {
  try {
    const isExist = await Holiday.findOne({
      holiday_date: body.holiday_date,
      deletedAt: null,
    });
    if (!isExist) {
      body.holiday_id = holidayId();
      const response = await new Holiday(body).save();
      if (!response) {
        return {
          success: false,
          message: STR_SOMETHING_WENT_WRONG,
          data: null,
        };
      }
      return {
        success: true,
        message: STR_HOLIDAY_ADDED_SUCCESSFULLY,
        data: response,
      };
    }
    return {
      success: false,
      message: STR_HOLIDAY_ALREADY_EXIST,
      data: null,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// For All Holiday
exports.list = async (datum) => {
  try {
    let { list, count, success, message } = await pagination.list(
      Holiday,
      datum,
      ["holiday_img"]
    );
    return {
      success: true,
      message: STR_HOLIDAY_FOUND_SUCCESSFULLY,
      data: { list, count, success, message },
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// For Single Holiday
exports.findOneHoliday = async (id) => {
  try {
    const response = await Holiday.findOne({
      holiday_id: id,
      deletedAt: null,
    }).populate("holiday_img");
    if (!response) {
      return {
        success: false,
        message: STR_HOLIDAY_DOESNT_EXIST,
        data: null,
      };
    }
    return {
      success: true,
      message: STR_HOLIDAY_FOUND_SUCCESSFULLY,
      data: response,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// For Update Holiday Details
exports.update = async (id, body) => {
  try {
    const isExist = await Holiday.findOne({ holiday_id: id, deletedAt: null });
    if (!isExist) {
      return {
        success: false,
        message: STR_HOLIDAY_DOESNT_EXIST,
        data: null,
      };
    }
    const response = await Holiday.findOneAndUpdate({ holiday_id: id }, body, {
      new: true,
    });
    if (!response) {
      return {
        success: false,
        message: STR_SOMETHING_WENT_WRONG,
        data: null,
      };
    }
    return {
      success: true,
      message: STR_HOLIDAY_UPDATED_SUCCESSFULLY,
      data: response,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};

// For Delete Holiday By Id
exports.delete = async (id) => {
  try {
    const isExist = await Holiday.findOne({ holiday_id: id, deletedAt: null });
    if (!isExist) {
      return {
        success: false,
        message: STR_HOLIDAY_DOESNT_EXIST,
        data: null,
      };
    }
    await Holiday.findOneAndUpdate(
      { holiday_id: id },
      { deletedAt: new Date() }
    );
    return {
      success: true,
      message: STR_HOLIDAY_DELETED_SUCCESSFULLY,
      data: null,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};
