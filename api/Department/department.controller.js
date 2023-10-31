const {
  departmentValidation,
  departmentUpdateValidation,
  departmentListValidation,
  singleDepartmentValidation,
} = require("./department.validator");
const router = require("express").Router();
const DepartmentService = require("./department.service");
const {
  DEPARTMENT_CREATED,
  STR_SOMETHING_WENT_WRONG,
  STR_INTERNAL_SERVER_ERROR,
  STR_DEPARTMENT_LIST_CAP,
  STR_DEPARTMENT_FOUND_CAP,
  STR_DEPARTMENT_DELETED_CAP,
  STR_DEPARTMENT_UPDATED_SUCCESSFULLY,
} = require("../../utils/const");
const { commonResponse } = require("../../helpers");

// For Add Department
router.post("/", departmentValidation, async ({ body }, res) => {
  try {
    const { success, message, data } = await DepartmentService.create(body);
    if (success) {
      return commonResponse.success(res, data, DEPARTMENT_CREATED, message);
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

// For Department List
router.get("/", departmentListValidation, async (req, res) => {
  try {
    const { pagination, search, filter, sortBy } = req.query;
    let { success, message, data } = await DepartmentService.list(
      pagination,
      search,
      filter,
      sortBy,
      req.userDetails
    );
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_DEPARTMENT_LIST_CAP,
        message
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

router.get("/:id", singleDepartmentValidation, async ({ params }, res) => {
  try {
    const { success, message, data } = await DepartmentService.singleDepartment(
      params.id
    );
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_DEPARTMENT_FOUND_CAP,
        message
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

// For Delete Department By Id
router.delete("/:id", singleDepartmentValidation, async ({ params }, res) => {
  try {
    const { success, message, data } = await DepartmentService.delete(
      params.id
    );
    if (success) {
      return commonResponse.success(
        res,
        data,
        STR_DEPARTMENT_DELETED_CAP,
        message
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

// For Edit Department by id
router.put(
  "/:id",
  departmentUpdateValidation,
  async ({ params, body }, res) => {
    try {
      const { success, message, data } = await DepartmentService.update(
        params.id,
        body
      );
      if (success) {
        return commonResponse.success(
          res,
          data,
          STR_DEPARTMENT_UPDATED_SUCCESSFULLY,
          message
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
  }
);

module.exports = router;
