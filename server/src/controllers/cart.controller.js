const { validationResult } = require("express-validator");
const APIError = require("../utils/apiError");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const { getInfoData } = require("../utils");

const findCartById = async (cartId) => {
  const foundCart = await cartModel.findById(cartId).lean();

  if (!foundCart) {
    return null;
  }

  const { cart_products } = foundCart;

  if (!cart_products.length) return foundCart;

  const result = await Promise.all(
    cart_products.map(
      (item) =>
        new Promise(async (resolve, reject) => {
          try {
            const product = await productModel.findById(item.product_id);

            if (!product) return resolve(null);

            resolve({
              quantity: item.quantity,
              ...getInfoData({
                fields: [
                  "_id",
                  "product_name",
                  "product_thumb",
                  "product_type",
                  "product_price",
                  "product_size",
                ],
                object: product,
              }),
            });
          } catch (error) {
            reject(error);
          }
        })
    )
  );

  const response = { ...foundCart, cart_products: result.filter((t) => t?._id) };

  return response;
};

const getCart = async (userId, cartId) => {
  if (cartId) return await cartModel.findById(cartId).lean();
  if (userId) return await cartModel.findOne({ user: userId }).lean();
  return null;
};

const cartController = {
  addCart: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { userId, cartId, product_id, quantity } = req.body;

    // check cart exit with userId or cartId
    const foundCart = await getCart(userId, cartId);

    const productAdd = { product_id, quantity };

    if (!foundCart) {
      // Create cart for user
      const newCart = await cartModel.create({
        user: userId,
        cart_count_product: 1,
        cart_products: [productAdd],
      });

      return res.json(newCart);
    }

    // update cart
    const { cart_products, _id } = foundCart;

    // find index product in cart
    const index = cart_products.findIndex((t) => t.product_id === product_id);

    // Check product exist in cart?
    if (index === -1) {
      // push to cart
      cart_products.push(productAdd);
    } else {
      // update quantity
      cart_products[index] = {
        ...cart_products[index],
        quantity: cart_products[index].quantity + quantity,
      };
    }

    const cartUpdated = await cartModel.findByIdAndUpdate(
      _id,
      { $set: { cart_products, cart_count_product: cart_products.length } },
      { new: true }
    );

    return res.json(cartUpdated);
  },

  getCartByUserId: async (req, res) => {
    const userId = req.params.userId;

    const foundCart = await cartModel.findOne({ user: userId }).lean();

    if (!foundCart) {
      return res.json(null);
    }

    const { cart_products } = foundCart;

    if (!cart_products.length) return res.json(foundCart);

    const result = await Promise.all(
      cart_products.map(
        (item) =>
          new Promise(async (resolve, reject) => {
            try {
              const product = await productModel.findById(item.product_id);

              if (!product) return resolve(null);

              resolve({
                quantity: item.quantity,
                ...getInfoData({
                  fields: [
                    "_id",
                    "product_name",
                    "product_thumb",
                    "product_type",
                    "product_price",
                    "product_size",
                  ],
                  object: product,
                }),
              });
            } catch (error) {
              reject(error);
            }
          })
      )
    );

    const response = { ...foundCart, cart_products: result.filter((t) => t?._id) };

    return res.json(response);
  },

  getCartById: async (req, res) => {
    const cartId = req.params.cartId;

    return res.json(await findCartById(cartId));
  },
};

module.exports = {
  cartController,
  findCartById,
};
