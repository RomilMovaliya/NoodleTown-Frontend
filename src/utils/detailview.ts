export const getData = async () => {
    const response = await fetch("http://localhost:3001/api/brandsDetails/");
    const result = await response.json();
    return result.data;
};