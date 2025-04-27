export const getFoodItemData = async () => {
    try {
        const response = await fetch("http://localhost:3001/api/foodItem/");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}