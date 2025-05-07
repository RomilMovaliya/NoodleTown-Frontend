export const getData = async () => {
    const response = await fetch("http://localhost:3001/api/recipes");
    const result = await response.json();
    return result.data;

};




// const { data: getData, isLoading: isLoadingMyData } = useQuery({
//     queryKey: ["recipes"],
//     queryFn: async () => {
//         const response = await fetch("http://localhost:3001/api/recipes");
//         const result = await response.json();
//         setRecipes(result.data);


//     }
// });