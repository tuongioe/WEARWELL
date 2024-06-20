export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export const sleep = (ms = 500) => new Promise((rs) => setTimeout(rs, ms));
