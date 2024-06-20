const { validationResult } = require("express-validator");
const APIError = require("../utils/apiError");
const productModel = require("../models/product.model");
const { mockProductFeMale, mockProductMale } = require("../utils/mockData");

const SERVER_URL = `http://localhost:${process.env.PORT}`;

const findProductByNameAndType = async (name, type, size) => {
  const nameRegex = { $regex: new RegExp(name), $options: "i" };
  return await productModel
    .findOne({ product_name: nameRegex, product_type: type, product_size: size })
    .lean();
};

const productController = {
  addProduct: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { product_name, product_type, product_size } = req.body;

    if (await findProductByNameAndType(product_name, product_type, product_size)) {
      throw new APIError(409, "Sản phẩm đã tồn tại");
    }

    // Create Product
    const added = await productModel.create({
      ...req.body,
    });

    return res.json(added);
  },
  addMany: async (req, res) => {
    await productModel.insertMany([...mockProductFeMale, ...mockProductMale]);
    return res.json(true);
  },
  getAllProduct: async (req, res) => {
    const conditions = {};

    if (req.query.type) {
      conditions["product_type"] = req.query.type;
    }

    if (req.query.name) {
      conditions["product_name"] = { $regex: new RegExp(req.query.name), $options: "i" };
    }

    const result = await productModel.find(conditions).lean();

    return res.json(result);
  },
  getProductById: async (req, res) => {
    const product = await productModel.findById(req.params.id).lean();

    if (!product) {
      throw new APIError(404, "Sản phẩm không tồn tại");
    }

    return res.json(product);
  },
};

module.exports = productController;
