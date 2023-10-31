const { createToken } = require("../../helpers/gaurds");
const user = require("../../models/user.model");
const userMeta = require("../../models/usermeta.model");
const bcrypt = require("bcryptjs");

exports.userLogin = async (body) => {
  try {
    const { email, password } = body;
    const isUserExist = await user.findOne({
      email,
    });
    if (!isUserExist) {
      return {
        success: false,
        message: "User doesn't exist",
        data: null,
      };
    }
    const validated = await bcrypt.compare(password, isUserExist.password);
    if (!validated) {
      return {
        success: false,
        message: "Password incorrect",
        data: null,
      };
    }
    const token = createToken(isUserExist);
    const updateToken = await userMeta.findOneAndUpdate(
      {
        user_id: isUserExist._id,
      },
      {
        token: token,
      }
    );
    return {
      success: true,
      message: "Login succussful",
      data: { ...JSON.parse(JSON.stringify(isUserExist)), token },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "",
      data: null,
    };
  }
};
