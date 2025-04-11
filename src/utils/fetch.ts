export const fetchAPI = async <T>(url: string, options?: RequestInit & { query?: Record<string, any> }): Promise<T> => {
  try {
    let finalUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`;

    if (options?.query) {
      const queryParams = new URLSearchParams();
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      finalUrl += `?${queryParams.toString()}`;
    }

    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }
    return response.json() as T;
  } catch (error) {
    console.error({ message: "Fetch Error", error });
    throw error;
  }
};
