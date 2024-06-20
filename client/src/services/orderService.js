import axiosClient from "../utils/http";

const orderService = {
  getOrderByUserId: async (userId) => {
    try {
      const response = await axiosClient.get("/order/" + userId);
      return response;
    } catch (error) {
      console.log(`error getOrderByUserId`, error);
      return [];
    }
  },
};

export default orderService;
