const router = require("express").Router();
const multer = require("multer");
const holiday_image = require("../../models/holiday_images.model");
const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");
const {
  STR_IMAGE_UPLOADED_CAP,
  STR_IMAGE_UPLOADED_SUCCESSFULLY,
  STR_SOMETHING_WENT_WRONG,
  STR_INTERNAL_SERVER_ERROR,
} = require("../../utils/const");
const { commonResponse } = require("../../helpers");

var imageObj = new ImageKit({
  publicKey: "public_qWASxjlpHx0DwZYOaea7TUgD3HA=",
  privateKey: "private_lJhHMCeGrTEXDEvFGNGOIiyd4Ek=",
  urlEndpoint: "https://ik.imagekit.io/ornf93fxv",
});

const holidayStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = path.join("public", "img", "holidays");
    ensureFolderExists(folderPath);
    cb(null, "public/img/holidays");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.replace(/[^a-zA-Z ]/g, "") +
        "-" +
        new Date().toDateString() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}
const uploadImgHoliday = multer({ storage: holidayStorage }).single(
  "holidayImg"
);

router.post("/holiday-img", uploadImgHoliday, async (req, res) => {
  try {
    const fileData = fs.readFileSync(req.file.path);
    const uploadResponse = await imageObj.upload({
      file: fileData,
      fileName:
        req.file.originalname.replace(/[^a-zA-Z ]/g, "") +
        "-" +
        new Date().toISOString() +
        "." +
        req.file.originalname.split(".").pop(),
      folder: "/img/holidays",
    });
    const ImageInfo = new holiday_image({
      ...uploadResponse,
      file_id: uploadResponse.fileId,
    });
    const response = await ImageInfo.save();
    const deleteImageFromPublic = fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      }
    });
    return commonResponse.success(
      res,
      response,
      STR_IMAGE_UPLOADED_CAP,
      STR_IMAGE_UPLOADED_SUCCESSFULLY
    );
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
