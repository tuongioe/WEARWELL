const productController = require("../controllers/product.controller");
const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { body } = require("express-validator");
const { productTypesArray } = require("../utils/constant");
const APIError = require("../utils/apiError");

router.post("/many", asyncHandler(productController.addMany));

router.post(
  "/",
  [
    body("product_name").notEmpty(),
    body("product_price").isNumeric().notEmpty(),
    body("product_size").notEmpty(),
    body("product_desc").notEmpty(),
    body("product_images")
      .isArray()
      .custom((images) => {
        if (images?.length < 4 || images?.length > 4) {
          throw new APIError(400, "Vui lòng gửi ảnh lên. Chỉ gửi 4 ảnh!");
        }

        return images;
      }),
    body("product_type")
      .notEmpty()
      .custom((type) => {
        if (!productTypesArray.includes(type)) {
          throw new APIError(
            400,
            'Vui lòng gửi product_type theo định dạng "Male", "FeMale", "Jacket", "TShirt", "Silk-Dress", "TShirt-Pants"'
          );
        }

        return type;
      }),
  ],
  asyncHandler(productController.addProduct)
);
router.get("/", asyncHandler(productController.getAllProduct));
router.get("/:id", asyncHandler(productController.getProductById));

module.exports = router;
