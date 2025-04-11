import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuService } from "../../../../services/menuService";
import styles from "./Menu.module.css";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["menu", selectedCategory, sortBy, sortOrder, searchQuery],
    queryFn: () =>
      MenuService.getMenu({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        search: searchQuery,
        sortBy,
        sortOrder,
      }),
  });

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(data?.data.map((item) => item.category)))];

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />
        </div>

        <div className={styles.filters}>
          <div className={styles.categoryFilter}>
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}>
                {category}
              </button>
            ))}
          </div>

          <div className={styles.sortControls}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={styles.select}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <div className={styles.loading}>Loading menu...</div>}
      {error && <div className={styles.error}>Error loading menu items</div>}

      <div className={styles.menuGrid}>
        {data?.data.map((item) => (
          <div key={item.id} className={styles.menuCard}>
            <div className={styles.imageContainer}>
              <img src={item.image_url} alt={item.name} className={styles.menuImage} />
              <span className={styles.categoryTag}>{item.category}</span>
              {!item.is_available && <div className={styles.soldOutOverlay}>Sold Out</div>}
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <p className={styles.itemDescription}>{item.description}</p>

              <div className={styles.availability}>
                <span className={`${styles.availabilityDot} ${item.is_available ? styles.available : styles.unavailable}`} />
                {item.is_available ? "Available" : "Unavailable"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
