const { cartController } = require("../controllers/cart.controller");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { body } = require("express-validator");

router.post(
  "/",
  [
    body("userId").optional(),
    body("cartId").optional(),
    body("product_id").notEmpty(),
    body("quantity").notEmpty(),
  ],
  asyncHandler(cartController.addCart)
);

router.get("/:cartId", asyncHandler(cartController.getCartById));
router.get("/user/:userId", asyncHandler(cartController.getCartByUserId));

module.exports = router;
