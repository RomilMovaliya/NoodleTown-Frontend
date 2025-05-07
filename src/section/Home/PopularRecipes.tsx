import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { leftImg, rightImg } from "../../assets/index";
import { yellow } from "@mui/material/colors";
import { ShoppingBag } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/homepage";

const PopularRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza");

    const { data: getMyData, isLoading: isLoadingMyData } = useQuery({
        queryKey: ["recipes"],
        queryFn: getData,
    });

    useEffect(() => {
        if (getMyData) {
            setRecipes(getMyData);
        }
    }, [getMyData]);



    const buttonItem = ["Pizza", "Dessert", "Sides", "Garlic Breads", "Burgers"];


    // Filter the recipes based on selected category
    const filteredRecipes = recipes.filter((recipe) => {
        if (!selectedCategory) return true;  // No category selected, show all
        return recipe.category === selectedCategory;
    });

    return (
        <Box className="content" sx={{ position: 'relative', marginTop: '80px' }}>
            {/* Title Section */}
            <Typography fontFamily={'Poppins'} sx={{
                fontSize: {
                    lg: '2rem',
                    xs: '20px',
                    sm: '2rem',
                    md: '2rem',
                }, textAlign: "center", marginBottom: "1rem", fontWeight: 600
            }}>
                Popular Recipes
            </Typography>

            {/* left-side image */}
            <Box
                sx={{

                    position: "absolute",
                    height: {
                        xs: '135px',
                        sm: '140px',
                        lg: '170px'
                    }, // Adjust this to match the image height
                    width: {
                        xs: '80px',
                        sm: '85px',
                        lg: '100px'
                    },  // 


                }}
            />
            <Box
                sx={{

                    position: "absolute",
                    height: {
                        xs: '135px',
                        sm: '140px',
                        lg: '170px'
                    }, // Adjust this to match the image height
                    width: {
                        xs: '80px',
                        sm: '85px',
                        lg: '100px'
                    },  // Adjust this to match the image width
                    top: '-60px',
                    left: 0,
                    background: `url(${leftImg}) no-repeat left top`,
                    backgroundSize: 'cover', // Adjust background size as needed
                }}
            />


            {/* Right-side image */}
            <Box
                sx={{

                    position: "absolute",
                    height: {
                        xs: '135px',
                        sm: '140px',
                        lg: '170px'
                    }, // Adjust this to match the image height
                    width: {
                        xs: '80px',
                        sm: '85px',
                        lg: '100px'
                    },  // 
                    top: '-90px',
                    right: 0,
                    background: `url(${rightImg}) no-repeat right top`, // Use the correct variable for the right image
                    backgroundSize: 'cover',
                }}
            />

            {/* Tab Buttons */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',  // 2 columns on extra small screens
                    sm: 'repeat(3, 1fr)',  // 3 columns on small screens
                    md: 'repeat(5, 1fr)',  // 5 columns on medium and above
                },
                gap: '20px',
                marginInline: '90px',
                marginTop: '70px',
            }}>


                {isLoadingMyData ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={100}
                            height={50}
                            sx={{ borderRadius: '30px' }}
                        />
                    ))
                ) : (
                    buttonItem.map((category, index) => (
                        <button

                            key={index}
                            onClick={() => setSelectedCategory(category)}  // Handle tab change and set category

                            style={{

                                fontWeight: 600,
                                backgroundColor: selectedCategory === category ? yellow[700] : '#ECEEF6',
                                color: selectedCategory === category ? 'white' : 'black',
                                height: '50px',
                                borderRadius: '30px',
                                border: 'none'
                            }}
                        >
                            {category}  {/* Display the name from the array */}
                        </button>
                    ))
                )}
            </Box>

            {/* Horizontal Scrollable Recipe Cards */}
            <Box sx={{
                marginTop: '30px',
                display: "flex",
                overflowX: "auto",
                gap: "1.5rem",
                marginInline: "3rem",
                paddingBottom: "3rem",
                scrollbarWidth: "none",
                scrollbarColor: "#888 transparent",
                "&::-webkit-scrollbar": { height: "8px" },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: "10px" },
                "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
            }}>


                {isLoadingMyData ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Box key={index} sx={{
                            flex: "0 0 250px",
                            padding: "2rem 1rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "2px solid #ECEEF6",
                            borderRadius: "1rem",
                            maxWidth: "300px",
                        }}>
                            <Skeleton variant="rectangular" width={128} height={128} sx={{ borderRadius: '1rem', marginBottom: '1rem' }} />
                            <Skeleton width="60%" height={30} sx={{ marginBottom: 1 }} />
                            <Skeleton width="80%" height={20} sx={{ marginBottom: 2 }} />
                            <Skeleton width="40%" height={24} />
                        </Box>
                    ))
                ) : (
                    filteredRecipes.length === 0 ? (
                        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
                            No items found
                        </Typography>
                    ) :
                        (filteredRecipes.map((recipe, index) => (
                            <Box key={index} className="card1" sx={{
                                flex: "0 0 250px", // Fixed width for horizontal scrolling
                                padding: "2rem 1rem",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                border: "2px solid #ECEEF6",
                                borderRadius: "1rem",
                                maxWidth: "300px",
                            }}>
                                <Box component="img" className="item-image" src={recipe.image} alt="" sx={{
                                    height: "8rem",
                                    width: "8rem",
                                    borderRadius: "1rem",
                                    marginBottom: "1rem",
                                    objectFit: "cover"
                                }} />
                                <Box className="title-and-time" sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h6" className="item">{recipe.title}</Typography>
                                </Box>
                                <Typography className="description light-text" sx={{

                                    textAlign: "center",
                                    marginBottom: "2rem",
                                    fontSize: "14px"
                                }}>{recipe.description}</Typography>
                                <Typography className="price" fontSize={20} fontWeight={500}>{recipe.price}</Typography>

                                <Box className="triangle" sx={{
                                    position: "absolute",
                                    bottom: "-1.5rem",
                                    left: "40%",
                                    transform: "rotate(45deg)",
                                    height: "3rem",
                                    width: "3rem",
                                    backgroundColor: "white",
                                    borderRight: "3px solid #ECEEF6",
                                    borderBottom: "3px solid #ECEEF6",
                                    borderRadius: "0.5rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Box className="circle" sx={{
                                        transform: "rotate(-45deg)",
                                        backgroundColor: "white",
                                        border: "2px solid #ECEEF6",
                                        padding: "0.4rem",
                                        borderRadius: "50%",
                                        background: "#F6B716",
                                    }}>
                                        <ShoppingBag sx={{
                                            fontSize: "1rem", // Set the size of the icon
                                            color: "black",   // Set the icon color
                                        }} />
                                    </Box>
                                </Box>
                            </Box>
                        ))))
                }





            </Box>
        </Box>
    );
};

export default PopularRecipes;