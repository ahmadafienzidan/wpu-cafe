import { fetchAPI } from "../utils/fetch";

export type Order = {
  id: string;
  customer_name: string;
  table_number: number;
  cart: Array<{
    quantity: number;
    notes: string;
    menuItem: {
      id: string;
      name: string;
      description: string;
      price: number;
      image_url: string;
      category: string;
    };
  }>;
  status: "PROCESSING" | "COMPLETED" | "PENDING";
  total: number;
  created_at: string;
  updated_at: string;
};

type GetOrdersParams = {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
};

export const OrderService = {
  getOrders: (params?: GetOrdersParams) =>
    fetchAPI<{ data: Order[] }>("/orders", {
      method: "GET",
      query: params,
    }),

  createOrder: async (orderData: {
    customerName: string;
    tableNumber: number;
    cart: Array<{
      menuItemId: string;
      quantity: number;
      notes: string;
    }>;
  }) => {
    return fetchAPI("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  getOrderDetail: (id: string) => fetchAPI<Order>(`/orders/${id}`, { method: "GET" }),

  updateOrder: async (id: string, body: any) => {
    const response = await fetchAPI<Order>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.cart.every((item) => item.menuItem)) {
      throw new Error("Invalid response format from server");
    }

    return response;
  },

  updateOrderStatus: (id: string, status: string) =>
    fetchAPI(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  deleteOrder: (id: string) =>
    fetchAPI(`/orders/${id}`, {
      method: "DELETE",
    }),
};
