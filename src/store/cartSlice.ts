import { toast } from "react-toastify";

// Interface for CartItem
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}


const addItemToCartApi = async (item: CartItem, user_id: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        user_id: user_id,
        item_id: item.id
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // <-- Log the raw error body
      console.error("Server responded with error:", errorBody);
      throw new Error("Failed to add item to server cart");
    }

    const data = await response.json();
    toast.success("Item added to cart successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to add item to server cart");
    console.error("Error adding item to server:", error);
  }
};

const removeItemFromCartApi = async (itemId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/cart/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from server cart");
    }

    const data = await response.json();
    toast.success("Item removed from cart successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to remove item from server cart");
    console.error("Error removing item from server:", error);
  }
};

export const getItemsFromCart = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/cart", {
      method: "GET", // GET request to fetch items from the cart
      headers: {
        "Content-Type": "application/json", // Set the appropriate header
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch items from server cart");
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
    // Dispatch the fetched data to Redux store
    //dispatch(setCartItems(data));
  } catch (error) {
    toast.error("Failed to get items from server cart");
    console.error("Error fetching items from server:", error);
  }
};

const incrementQuantityApi = async (
  itemId: string
) => {

  try {
    const response = await fetch(`http://localhost:3001/api/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "increment" }),
    });

    if (!response.ok) {
      throw new Error("Failed to increment item quantity");
    }

    const data = await response.json();
    toast.success("Item quantity added successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to increment item quantity");
    console.error("Error incrementing item quantity:", error);
  }
};

const decrementQuantityApi = async (
  itemId: string,
  quantity: number
) => {

  if (quantity <= 1) {
    removeItemFromCartApi(itemId);
    return;
  }
  try {
    const response = await fetch(`http://localhost:3001/api/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "decrement" }),
    });

    // if (newQuantity <= 1) {
    //   await removeItemFromCartApi(itemId);
    //   toast.success("Item quantity removed successfully!");
    //   return;
    // }
    if (!response.ok) {
      throw new Error("Failed to decrement item quantity");
    }

    const data = await response.json();
    toast.success("Item quantity removed successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to decrement item quantity");
    console.error("Error decrementing item quantity:", error);
  }
};

// Export the API call function to use in your component
export {
  addItemToCartApi,
  removeItemFromCartApi,
  incrementQuantityApi,
  decrementQuantityApi,
};
