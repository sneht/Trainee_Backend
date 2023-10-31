const user = require("../../models/user.model");
const userMeta = require("../../models/usermeta.model");
const bcrypt = require("bcryptjs");
const {
  STR_SOMETHING_WENT_WRONG,
  STR_EMPLOYEE_FOUND_SUCCESSFULLY,
} = require("../../utils/const");
const mongoose = require("mongoose");
const pagination = require("../../helpers/pagination");
const ObjectId = mongoose.Types.ObjectId;

exports.registerUser = async (body) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      joining_date,
      email,
      password,
      mobile_number,
      department,
      role,
      address,
      birth_date,
    } = body || {};
    const isUserAlreadyExist = await user.findOne({
      $or: [{ email }, { mobile_number }],
      deletedAt: null,
    });

    if (!isUserAlreadyExist) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(String(password), salt);
      const newUser = new user({
        firstname,
        lastname,
        gender,
        joining_date,
        email,
        password: hashedPassword,
        mobile_number,
        department,
        role,
        address,
        birth_date,
      });
      const response = await newUser.save();
      if (!response) {
        return {
          success: false,
          message: "Error while creating user",
          data: null,
        };
      }
      const newUserMeta = await userMeta.create({
        user_id: response._id,
      });
      return {
        success: true,
        message: "User added successfully",
        data: response,
      };
    }
    return {
      success: false,
      message: "User already exist",
      data: null,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message,
      data: null,
    };
  }
};

exports.findAllUsers = async (datum, userDetails) => {
  try {
    let whereObj = {};
    const { _id } = userDetails || {};
    if (_id) {
      whereObj._id = { $ne: _id };
    }
    const { list, count, success, message } = await pagination.list(
      user,
      datum,
      ["role", "department"],
      whereObj
    );

    return {
      success: true,
      message: STR_EMPLOYEE_FOUND_SUCCESSFULLY,
      data: { list, count, success, message },
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message,
      data: null,
    };
  }
};

exports.findUserById = async (_id) => {
  try {
    const response = await user.findById({ _id, deletedAt: null });
    if (!response) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "User found",
      data: response,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message,
      data: null,
    };
  }
};

exports.findAndUpdateUserById = async (_id, body) => {
  try {
    const response = await user.findByIdAndUpdate(
      { _id: new ObjectId(_id), deletedAt: null },
      body
    );
    if (!response) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "User Updated found",
      data: response,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message,
      data: null,
    };
  }
};

exports.findAndDeleteUser = async (id) => {
  try {
    console.log(" _id:", id);
    const response = await user.findOneAndUpdate(
      { _id: new ObjectId(id), deletedAt: null },
      { deletedAt: new Date() }
    );
    console.log("response:", response);
    if (!response) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    await userMeta.findOneAndUpdate({ user_id: id }, { deletedAt: new Date() });
    return {
      success: true,
      message: "User deleted succussfuly",
      data: response,
    };
  } catch (err) {
    const { message = STR_SOMETHING_WENT_WRONG } = err || {};
    return {
      success: false,
      message,
      data: null,
    };
  }
};
