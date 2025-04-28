import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

// Interface for CartState
interface CartState {
  items: CartItem[];
  quantity: number;
}

// Initial state for cart
const initialState: CartState = {
  items: [],
  quantity: 0,
};

// Slice for managing cart actions
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If the item exists and quantity is less than 5, increase the quantity
        if (existingItem.quantity < 5) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity < 5) {
          item.quantity += 1;
        } else {
          toast.warning(`${item.name} cannot be added more than 5 times.`);
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },

    // New reducer to set the cart items from the server
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

const addItemToCartApi = async (item: CartItem, user_id: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        description: "N/A",
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        user_id: user_id,
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

const removeItemFromCartApi = async (itemId: number) => {
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

const getItemsFromCart = async (dispatch: any) => {
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

    // Dispatch the fetched data to Redux store
    dispatch(setCartItems(data));
  } catch (error) {
    toast.error("Failed to get items from server cart");
    console.error("Error fetching items from server:", error);
  }
};

const incrementQuantityApi = async (
  itemId: number,
  currentQuantity: number
) => {
  if (currentQuantity === 5) {
    toast.warning("Item quantity cannot exceed 5.");
    return;
  }

  const newQuantity = currentQuantity < 5 ? currentQuantity + 1 : 5;
  console.log("new quantity: ", newQuantity);
  try {
    const response = await fetch(`http://localhost:3001/api/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
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
  itemId: number,
  currentQuantity: number
) => {
  const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 0;

  try {
    const response = await fetch(`http://localhost:3001/api/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (newQuantity <= 1) {
      await removeItemFromCartApi(itemId);
      toast.success("Item quantity removed successfully!");
      return;
    }
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

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

// Export the API call function to use in your component
export {
  addItemToCartApi,
  removeItemFromCartApi,
  getItemsFromCart,
  incrementQuantityApi,
  decrementQuantityApi,
};
