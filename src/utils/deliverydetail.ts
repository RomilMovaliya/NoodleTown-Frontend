export const updateOrderId = async (id: string, order_id: string) => {
    const response = await fetch("http://localhost:3001/api/updateOrderId", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, order_id }),
    });

    const result = await response.json();

    return result;
}