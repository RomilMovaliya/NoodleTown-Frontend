
import axiosInstance from "./axiosInstance";

// Function to fetch cart items from the server
export const fetchCartItems = async () => {
    const res = await axiosInstance.get("/cart");

    console.log("Fetched cart items for cartitem page:", res.data);
    return res.data;
};



export const clearCartItem = async (userId: string) => {
    const res = await fetch(`http://localhost:3001/api/cart/clear/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to remove items from server cart");
    }
    const data = await res.json();
    console.log("cleard cart items:", data);
    return data;
}

// Function to add order items based on cart items
export const addOrderItem = async (user_id: string, order_id: string) => {
    try {
        // Fetch the cart items first
        const cartData = await fetchCartItems();

        const cartItems = cartData.cartItems || [];
        // Map through the cart items and create an array of order item objects
        const orderItems = cartItems.map((item: any) => ({
            user_id,
            name: item.name,
            image: item.image,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
            order_id, // We are associating the provided order_id with each item
        }));

        // Now we need to send a POST request for each order item
        const responses = await Promise.all(
            orderItems.map(async (orderItem: any) => {
                const response = await fetch("http://localhost:3001/api/orderItem/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderItem),
                });

                if (!response.ok) {
                    throw new Error(`Failed to add order item for ${orderItem.name}`);
                }

                const data = await response.json();
                clearCartItem(user_id); // Clear the cart after adding order items
                return data;
            })
        );

        // Return the responses for the added order items
        return responses;

    } catch (error) {
        console.error("Error adding order items:", error);
        throw error;
    }
};

export const generateOrder = async (user_id: string) => {

    const cartData = await fetchCartItems();

    const cartItems = cartData.cartItems || [];

    const totalPrice = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

    try {
        const response = await fetch("http://localhost:3001/api/order/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id,
                price: totalPrice,
                quantity: totalQuantity,
                orderStatus: "NOT PLACED",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create order");
        }

        const data = await response.json();
        console.log("Order created:", data.order_id);
        return data.order_id;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};


