import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ReviewsService } from "../../../services/reviewsService";
import styles from "./MenuItemSelect.module.css";

type MenuItem = {
  id: string;
  name: string;
};

type MenuItemResponse = {
  data: MenuItem[];
};

interface MenuItemSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MenuItemSelect: React.FC<MenuItemSelectProps> = ({ value, onChange }) => {
  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery<MenuItemResponse>({
    queryKey: ["menuItems"],
    queryFn: ReviewsService.getMenuItems,
  });

  if (isLoading) return <div>Loading menu items...</div>;
  if (isError) return <div>Failed to load menu items.</div>;

  return (
    <div className={styles.wrapper}>
      <label htmlFor="menu-select" className={styles.label}>
        Select Menu
      </label>
      <select id="menu-select" value={value} onChange={onChange} className={styles.select} required>
        <option value="">Select a menu item</option>
        {menuItems!.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuItemSelect;
