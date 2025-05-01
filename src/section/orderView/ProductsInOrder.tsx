import { Box, Stack } from "@mui/material";

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    order_id: string;
    image: string;
}

interface Props {
    products: Product[];
}

const ProductsInOrder: React.FC<Props> = ({ products }) => {

    return (
        <Box
            sx={{
                marginInline: {
                    xs: "20px",
                    sm: "80px",
                    md: "80px",
                    lg: "80px",
                },
                marginTop: "40px",
                marginBottom: "40px"
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#f4f6f9",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px #0000001a",
                }}
            >
                <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                    }}
                >
                    Products in Order
                </p>

                <hr
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        border: "2px solid #E0E0E0",
                    }}
                />

                {/* Example Product - Replace with mapped products */}
                {products.map((item) => (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "flex-start",
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 4px #0000001a",
                                marginTop: "20px",
                            }}
                        >
                            <img
                                src={item?.image}
                                alt="Product"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "10px",
                                    objectFit: "cover",
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
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                    }}
                                >
                                    {item.name}

                                </p>

                                <p
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        fontFamily: "Poppins",
                                        color: "#666",
                                    }}
                                >
                                    {item.description}
                                </p>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        marginTop: "10px",
                                    }}
                                >
                                    <p style={{ fontWeight: "500", fontFamily: "Poppins" }}>Price:</p>
                                    <p style={{ fontFamily: "Poppins" }}>₹{item?.price}</p>
                                    <p style={{ fontWeight: "500", fontFamily: "Poppins" }}>Quantity:</p>
                                    <p style={{ fontFamily: "Poppins" }}>{item?.quantity}</p>
                                </Stack>
                            </Stack>
                        </Box>
                    </>
                ))}

            </Box>
        </Box>
    );
};

export default ProductsInOrder;
