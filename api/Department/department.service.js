const Department = require("../../models/department.model");
const pagination = require("../../shared/helpers/pagination");
const {
  STR_DEPARTMENT_ALREADY_EXIST,
  STR_DEPARTMENT_ADDED_SUCCESSFULLY,
  STR_DEPARTMENT_DOES_NOT_EXIST,
  STR_DEPARTMENT_DELETED_SUCCESSFULLY,
  STR_DEPARTMENT_UPDATED_SUCCESSFULLY,
  STR_SOMETHING_WENT_WRONG,
  STR_DEPARTMENT_FOUND_SUCCESSFULLY,
} = require("../../utils/const");

// Add Department
exports.create = async ({ department_name }) => {
  try {
    const isExist = await Department.findOne({
      department_name: department_name.trim(),
      deletedAt: null,
    });
    if (!isExist) {
      const { department_id } = await Department.findOne().sort({
        createdAt: -1,
      });
      const response = await new Department({
        department_name: department_name.trim(),
        department_id: department_id + 1,
      }).save();
      if (!response) {
        return {
          success: false,
          message: STR_SOMETHING_WENT_WRONG,
          data: {},
        };
      }
      return {
        success: true,
        message: STR_DEPARTMENT_ADDED_SUCCESSFULLY,
        data: response,
      };
    }
    return {
      success: false,
      message: STR_DEPARTMENT_ALREADY_EXIST,
      data: {},
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

// For Department List
exports.list = async (datum, search, filter, sortBy, { department_id }) => {
  try {
    let newObj = {};
    let sortObj = sortBy;
    if (department_id !== 1) {
      newObj.department_id = { $ne: 1 };
    }
    if (search) {
      if (search.department_name && search.department_name.length > 0) {
        newObj.department_name = {
          $regex: ".*" + search.department_name + ".*",
          $options: "i",
        };
      }
    }
    if (filter) {
      if (filter.isActive && filter.isActive.length > 0) {
        newObj.isActive = filter.isActive;
      }
    }
    let { list, count, success, message } = await pagination.list(
      Department,
      datum,
      [],
      newObj,
      sortObj
    );

    return {
      success: true,
      message: STR_DEPARTMENT_FOUND_SUCCESSFULLY,
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

// For Edit Department by id
exports.update = async (id, body) => {
  try {
    const isExist = Department.findOne({ department_id: id, deletedAt: null });
    if (!isExist) {
      return {
        success: false,
        message: STR_DEPARTMENT_DOES_NOT_EXIST,
        data: null,
      };
    }
    const response = await Department.updateOne({ department_id: id }, body);
    if (!response) {
      return {
        success: false,
        message: STR_DEPARTMENT_DOES_NOT_EXIST,
        data: null,
      };
    }
    return {
      success: true,
      message: STR_DEPARTMENT_UPDATED_SUCCESSFULLY,
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

exports.singleDepartment = async (id) => {
  try {
    const res = await Department.findOne({
      department_id: id,
      deletedAt: null,
    });
    if (!res) {
      return {
        success: false,
        message: STR_DEPARTMENT_DOES_NOT_EXIST,
        data: {},
      };
    }
    return {
      success: true,
      message: STR_DEPARTMENT_FOUND_SUCCESSFULLY,
      data: res,
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

// For Delete Department By Id
exports.delete = async (id) => {
  try {
    const isExist = await Department.findOne({
      department_id: id,
      deletedAt: null,
    });
    if (!isExist) {
      return {
        success: false,
        message: STR_DEPARTMENT_DOES_NOT_EXIST,
        data: {},
      };
    }
    await Department.updateOne(
      { department_id: id },
      { deletedAt: new Date() }
    );
    return {
      success: true,
      message: STR_DEPARTMENT_DELETED_SUCCESSFULLY,
      data: {},
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
