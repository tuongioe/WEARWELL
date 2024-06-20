const uploadController = require("../controllers/upload.controller");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const upload = require("../utils/multerConfig");

router.post("/local/file", upload.single("file"), asyncHandler(uploadController.fromLocalFile));
router.post("/local/files", upload.array("files"), asyncHandler(uploadController.fromLocalFiles));

module.exports = router;
