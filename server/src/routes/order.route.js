const orderController = require("../controllers/order.controller");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { body } = require("express-validator");

router.post(
  "/checkout",
  [
    body("userId").notEmpty(),
    body("cartId").notEmpty(),
    body("payment").notEmpty(),
    body("shipping").isObject().notEmpty(),
  ],
  asyncHandler(orderController.checkoutOrder)
);

router.get("/:userId", asyncHandler(orderController.getOrderByUserId));

module.exports = router;
