
// export const apiUrl = "https://opd-queue.udch.work/api";
// export const apiUrl = "http://localhost/opd_queue_api";
export const apiUrl =  import.meta.env.MODE === 'development' ? import.meta.env.VITE_HOST_DEV : import.meta.env.VITE_HOST

// export const imageUrl = "http://localhost:8081";

export const server = {
  CONFIG: `/opdConfigMenu.php`,
  GET_QUEUE: `/opdQueue.php`,
  // REGISTER_URL: `register`,
  // PRODUCT_URL: `product`,
  // TRANSACTION_URL: `transaction`,
  // REPORT_URL: `report`,
  // TOKEN_KEY: `token`,
};
