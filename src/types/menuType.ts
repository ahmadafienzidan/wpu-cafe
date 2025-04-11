export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  created_at: string;
};

export type MenuResponse = {
  data: MenuItem[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};
