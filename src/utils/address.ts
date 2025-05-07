export const getAddress = async (userId: string) => {
    const response = await fetch(`http://localhost:3001/api/delivery/${userId}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}


export const fetchOrderPageData = async (userId: string) => {
    const response = await fetch(`http://localhost:3001/api/cart/`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    let totalprice = 0;
    let totalitems = 0;
    data.forEach((item: any) => {
        item.user_id === userId;
        console.log("fetchOrderPageData data", item.user_id === userId);

        if (item.user_id === userId) {
            totalitems += item.quantity;
            totalprice += item.price * item.quantity;
        }
    }
    );

    return { totalitems, totalprice };
}

export const fetchOrderData = async (userId: string) => {
    const response = await fetch(`http://localhost:3001/api/order/${userId}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const count = data.length;

    return { data, count };
}


export const addOrderItem = async (user_id: string, name: string, image: string, description: string, price: number, quantity: number, category: string, order_id: string) => {

    const response = await fetch(`http://localhost:3001/api/orderItem/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, name, image, description, price, quantity, category, order_id }),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}




