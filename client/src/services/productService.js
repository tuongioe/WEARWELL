import axiosClient from "../utils/http";

const productService = {
  getAllProduct: async (type, name) => {
    try {
      const response = await axiosClient.get("/product", { params: { type, name } });
      return response;
    } catch (error) {
      console.log(`error get product`, error);
      return [];
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axiosClient.get(`/product/${id}`);
      return response;
    } catch (error) {
      console.log(`error get a product`, error);
      return null;
    }
  },
};

export default productService;
