const router = require("express").Router();

router.use("/upload", require("./upload.route"));
router.use("/user", require("./user.route"));
router.use("/product", require("./product.route"));
router.use("/cart", require("./cart.route"));
router.use("/order", require("./order.route"));

module.exports = router;
