import { MenuItem } from "../types/menuType";
import { fetchAPI } from "../utils/fetch";

export const MenuService = {
  getMenu: async (params?: { category?: string; search?: string; sortBy?: string; sortOrder?: string; page?: number; pageSize?: number }) => {
    return fetchAPI<{ data: MenuItem[] }>("/menu", { query: params });
  },
};
