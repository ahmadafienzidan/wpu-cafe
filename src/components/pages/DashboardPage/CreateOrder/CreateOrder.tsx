import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCartStore } from "../../../../stores/cartStore";
import { MenuService } from "../../../../services/menuService";
import { OrderService } from "../../../../services/orderService";
import styles from "./CreateOrder.module.css";
import MenuCard from "../../../ui/MenuCard";
import CartSection from "../../../ui/Cart/CartSection";
import { MenuItem } from "../../../../types/menuType";

const CreateOrder = () => {
  const { items: cartItems, addItem, removeItem, updateQuantity, updateNotes, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: menuData, error } = useQuery({
    queryKey: ["menu", selectedCategory, sortBy, sortOrder, searchQuery],
    queryFn: () =>
      MenuService.getMenu({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        search: searchQuery,
        sortBy,
        sortOrder,
        pageSize: 100,
      }),
    select: (res) => res.data,
  });

  const createOrderMutation = useMutation({
    mutationFn: OrderService.createOrder,
    onSuccess: () => {
      clearCart();
      setCustomerName("");
      setTableNumber("");
      alert("Order created successfully!");
    },
    onError: () => {
      alert("Failed to create order");
    },
  });

  const categories = ["All", ...new Set(menuData?.map((item) => item.category))];

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
    });
  };

  const handleDecrement = (itemId: string) => {
    const existingItem = cartItems.find((i) => i.menuItemId === itemId);
    if (existingItem?.quantity === 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, Math.max(0, (existingItem?.quantity || 0) - 1));
    }
  };

  const handleSubmitOrder = () => {
    if (!customerName || !tableNumber) {
      alert("Please fill customer name and table number");
      return;
    }
    createOrderMutation.mutate({
      customerName,
      tableNumber: parseInt(tableNumber),
      cart: cartItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        notes: item.notes,
      })),
    });
  };

  if (error) return <div className={styles.error}>Error loading menu</div>;

  return (
    <div className={styles.container}>
      <div className={styles.menuSection}>
        {/* Filter Controls */}
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />
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

        <div className={styles.menuGrid}>
          {(menuData || []).map((item) => {
            const cartItem = cartItems.find((i) => i.menuItemId === item.id);
            return (
              <MenuCard
                key={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                imageUrl={item.image_url}
                quantity={cartItem?.quantity || 0}
                onAdd={() => handleAddToCart(item)}
                onRemove={() => handleDecrement(item.id)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.cartSection}>
        <CartSection
          items={cartItems.map((item) => ({
            id: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            notes: item.notes,
          }))}
          onNotesChange={(itemId, notes) => updateNotes(itemId, notes)}
          customerName={customerName}
          tableNumber={tableNumber}
          onCustomerNameChange={setCustomerName}
          onTableNumberChange={setTableNumber}
          onRemoveItem={removeItem}
          onSubmit={handleSubmitOrder}
        />
      </div>
    </div>
  );
};

export default CreateOrder;
