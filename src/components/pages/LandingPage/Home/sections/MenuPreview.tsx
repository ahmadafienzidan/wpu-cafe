import { useQuery } from "@tanstack/react-query";
import { MenuService } from "../../../../../services/menuService";
import styles from "../Home.module.css";

const MenuPreview = () => {
  const {
    data: menuData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: () => MenuService.getMenu(),
    select: (res) => [...res.data].sort(() => 0.5 - Math.random()).slice(0, 3),
  });

  return (
    <section className={styles.menuSection} id="menu">
      <h2 className={styles.menuTitle}>Our Signature Items</h2>
      {isLoading && <div className={styles.loading}>Loading menu...</div>}
      {error && <div className={styles.error}>Error loading menu</div>}
      {menuData && (
        <div className={styles.menuGrid}>
          {menuData.map((item) => (
            <div className={styles.menuItem} key={item.id}>
              <div className={styles.imageContainer}>
                <img src={item.image_url} alt={item.name} className={styles.menuImage} />
              </div>
              <div className={styles.menuContent}>
                <h3 className={styles.menuItemTitle}>{item.name}</h3>
                <p className={styles.menuDescription}>{item.description}</p>
                <p className={styles.menuPrice}>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuPreview;
