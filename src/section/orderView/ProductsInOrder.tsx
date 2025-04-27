import { Box, Stack } from "@mui/material";

const ProductsInOrder = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens and horizontally on larger screens
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginInline: {
                    xs: "10px",
                    sm: "20px",
                    md: "40px",
                    lg: "60px",
                },
                marginTop: "40px",
                backgroundColor: "#f4f6f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px #0000001a",
                width: "100%",
            }}
        >
            <Box sx={{ flex: 1, width: "100%" }}>
                <p
                    style={{
                        fontSize: "18px", // Adjusted font size for better responsiveness
                        fontWeight: "500",
                        fontFamily: "Poppins",
                    }}
                >
                    Products in Order
                </p>

                <hr
                    style={{
                        width: "100%",
                        marginTop: "5px",
                        border: "2px solid #E0E0E0",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on smaller screens
                        alignItems: "flex-start",
                        width: "100%",
                        marginTop: "10px",
                    }}
                >
                    <img
                        src=""
                        alt="Product"
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                            objectFit: "cover", // Ensure image scales well
                            // Adds spacing at the bottom for smaller screens
                        }}
                    />

                    <Stack
                        sx={{
                            marginLeft: { sm: "20px" },
                            marginTop: { xs: "10px", sm: "0" },
                            width: "100%",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "16px", // Adjusted font size for better readability on small screens
                                fontWeight: "500",
                                fontFamily: "Poppins",
                            }}
                        >
                            Product Name
                        </p>

                        <p
                            style={{
                                fontSize: "14px", // Smaller font for description
                                fontWeight: "400",
                                fontFamily: "Poppins",
                                color: "#666",
                            }}
                        >
                            Product Description
                        </p>

                        <Stack
                            direction="row"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "10px",
                                marginBottom: "10px",
                                flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on mobile
                            }}
                            spacing={2}
                        >
                            <p
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins",
                                }}
                            >
                                Price:
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins",
                                }}
                            >
                                ₹1000
                            </p>

                            <p
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins",
                                }}
                            >
                                Quantity:
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins",
                                }}
                            >
                                1
                            </p>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductsInOrder;
