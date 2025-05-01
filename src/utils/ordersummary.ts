export const getOrderItem = async () => {
    const response = await fetch("http://localhost:3001/api/orderItem/");
    const data = response.json();

    return data;
}