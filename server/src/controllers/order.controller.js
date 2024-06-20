const { validationResult } = require("express-validator");
const APIError = require("../utils/apiError");
const orderModel = require("../models/order.model");
const { findCartById } = require("./cart.controller");
const cartModel = require("../models/cart.model");

const orderController = {
  checkoutOrder: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { userId, cartId, shipping, payment } = req.body;

    const foundCart = await findCartById(cartId);

    const { cart_products, user: userIdByCart } = foundCart;

    if (!cart_products.length) {
      throw new APIError(400, "Giỏ hàng của bạn đang trống!");
    }

    if (userId !== userIdByCart?.toString()) {
      throw new APIError(403, "Giỏ hàng không phải của bạn!");
    }

    const totalPrice = cart_products.reduce(
      (acc, val) => (acc += val.product_price * val.quantity),
      0
    );

    // calc total price
    const checkout_order = {
      totalPrice: totalPrice,
      totalCheckout: totalPrice,
    };

    // create order
    const newOrder = await orderModel.create({
      order_checkout: checkout_order,
      order_products: cart_products,
      order_shipping: shipping,
      order_payment: payment,
      order_status: "pending",
      user: userId,
    });

    // reset cart

    await cartModel.findByIdAndUpdate(cartId, {
      $set: { cart_count_product: 0, cart_products: [] },
    });

    return res.json(newOrder);
  },

  getOrderByUserId: async (req, res) => {
    const userId = req.params.userId;

    return res.json(await orderModel.find({ user: userId }).sort({ createdAt: "desc" }).lean());
  },
};

module.exports = orderController;
