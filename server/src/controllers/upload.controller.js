const APIError = require("../utils/apiError");

const uploadController = {
  fromLocalFile: async (req, res) => {
    const { file } = req;

    if (!file) throw new APIError(400, "Không tìm thấy file upload!");

    res.json(file);
  },

  fromLocalFiles: async (req, res) => {
    const { files } = req;

    if (!files.length) {
      throw new APIError(400, "Không tìm thấy files upload!");
    }

    res.json(files);
  },
};

module.exports = uploadController;
