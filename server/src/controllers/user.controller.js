const { validationResult } = require("express-validator");
const APIError = require("../utils/apiError");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { getInfoData, removeUndefineObject } = require("../utils");

const userController = {
  register: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { username, password, fullName } = req.body;

    // check username
    const [foundUser, isExistAdmin] = await Promise.all([
      userModel.findOne({ user_username: username }).lean(),
      userModel.findOne({ user_role: "admin" }).lean(),
    ]);

    if (foundUser) {
      throw new APIError(409, "Tài khoản đã tồn tại!");
    }

    // create user
    const hashPassword = await bcrypt.hash(password, 10);
    const added = await userModel.create({
      user_fullName: fullName,
      user_password: hashPassword,
      user_role: isExistAdmin ? "user" : "admin",
      user_username: username,
    });

    res.json(
      getInfoData({ fields: ["_id", "user_fullName", "user_username", "user_role"], object: added })
    );
  },

  login: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { username, password } = req.body;

    // check username
    const foundUser = await userModel.findOne({ user_username: username }).lean();

    if (!foundUser) {
      throw new APIError(400, "Tài khoản không tồn tại!");
    }

    // check password
    const compare = await bcrypt.compare(password, foundUser.user_password);

    if (!compare) {
      throw new APIError(400, "Mật khẩu không chính xác!");
    }

    res.json(getInfoData({ fields: ["_id", "user_username", "user_role"], object: foundUser }));
  },

  updateProfile: async (req, res) => {
    const { fullName, phone, address, password } = req.body;
    const userId = req.params.userId;

    const data = removeUndefineObject({
      user_fullName: fullName,
      user_phone: phone,
      user_address: address,
      user_password: password ? await bcrypt.hash(password, 10) : "",
    });

    const updated = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },
      { new: true, lean: true }
    );

    if (!updated) {
      throw new APIError(400, "Không tìm thấy người dùng");
    }

    return res.json(
      getInfoData({
        fields: [
          "_id",
          "user_fullName",
          "user_username",
          "user_role",
          "user_phone",
          "user_address",
        ],
        object: updated,
      })
    );
  },

  getMe: async (req, res) => {
    const foundUser = await userModel.findById(req.params.id).lean();

    if (!foundUser) throw new APIError(404, "Không tìm thấy thông tin");

    return res.json(
      getInfoData({
        fields: [
          "_id",
          "user_fullName",
          "user_username",
          "user_role",
          "user_phone",
          "user_address",
        ],
        object: foundUser,
      })
    );
  },
};

module.exports = userController;
