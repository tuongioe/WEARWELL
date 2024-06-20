const userController = require("../controllers/user.controller");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { body } = require("express-validator");

router.get("/me/:id", asyncHandler(userController.getMe));

router.post(
  "/register",
  body("username").notEmpty(),
  body("password").notEmpty(),
  body("fullName").notEmpty(),
  asyncHandler(userController.register)
);

router.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty(),
  asyncHandler(userController.login)
);

router.patch("/profile/:userId", asyncHandler(userController.updateProfile));

module.exports = router;
