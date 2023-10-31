const mongoose = require("mongoose");

exports.filter = (data) => {
  const whereAnd = { $and: [] };
  const where = [];
  let condition = {};
  const {
    queries: { columns, values },
    operator,
    type,
    range: { fromDate, toDate },
  } = data;

  if (columns.length > 0) {
    where["$" + operator] = [];
    const opr = "$" + operator;

    condition[opr] = [];

    for (let key in columns) {
      const obj = {};
      const each = columns[key];

      if (type === "like") {
        obj[each] = { $regex: values[key] };
      } else {
        obj[each] = { $in: [values[key]] };
      }

      condition[opr].push(obj);
    }

    whereAnd.$and.push(condition);

    if (fromDate && toDate) {
      whereAnd.$and.push({ createdAt: { $gt: fromDate, $lt: toDate } });
    }
  }

  return whereAnd;
};

exports.list = async (model, data, populate = [], whereObj, sortObj) => {
  try {
    let where = { ...whereObj };
    if (data) {
    } else {
      data = { page: "1", rowsPerPage: "100000" };
    }
    const { sortBy, descending, rowsPerPage, page } = data;
    where.deletedAt = null;
    if (!page) throw { message: "Invalid page (x=>1)" };

    if (page <= 0) throw { message: "Invalid page (x=>1)" };

    if (!rowsPerPage) throw { message: "Invalid per page (x=>1)" };

    if (!rowsPerPage > 0) throw { message: "Invalid per page (x=>1)" };

    const sort = {};
    sort[sortBy ? sortBy : "updatedAt"] = descending ? descending : "desc";

    const datum = await model
      .find(where)
      .populate(populate)
      .sort(sortObj)
      .limit(rowsPerPage)
      .skip(rowsPerPage * (page - 1));

    const count = await model.countDocuments(where);
    return {
      list: datum,
      count,
      success: true,
      message: "Paginated data",
    };
  } catch (e) {
    return {
      list: [],
      count: 0,
      success: false,
      message: e.message || "Error fetching paginated data",
    };
  }
};
