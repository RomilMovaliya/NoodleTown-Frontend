import { Box, Stack } from "@mui/material"
import ProductsInOrder from "./ProductsInOrder"

const OrderSummary = () => {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginInline: {
                    xs: "20px",
                    sm: "80px",
                    md: "80px",
                    lg: "80px",
                },

                marginTop: "120px",
                backgroundColor: "#f4f6f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px #0000001a",

            }}>

                <p style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                }}>Order #645458c8e</p>

                <p style={{
                    backgroundColor: "#E6F4EA",
                    color: "#4CAF50",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                    textTransform: "uppercase",
                }}>PLACED</p>

            </Box >



            <Box sx={{

                alignItems: "center",
                marginInline: {
                    xs: "20px",
                    sm: "80px",
                    md: "80px",
                    lg: "80px",
                },
                marginTop: "30px",
                backgroundColor: "#f4f6f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px #0000001a",
            }}>

                <p style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                }}>Order Summary</p>

                <hr style={{
                    width: "100%",
                    borderTop: "3px solid #ccc",
                    margin: "10px 0"
                }} />

                <Stack sx={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px #0000001a",
                }}>
                    <p style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                    }}>shipping Address</p>
                    <p style={{
                        color: "#7F8C8D",
                    }}>sarthana jakatnaka usa, street-09</p>
                </Stack>

                <Stack sx={{
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginBlock: "20px",
                    boxShadow: "0 2px 4px #0000001a",
                }}>
                    <p style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                    }}>Financial Breakdown</p>

                    <Stack sx={{
                        color: "#7F8C8D",
                    }}>
                        <p >Total : ₹1110</p>
                        <p >Discount : ₹0</p>
                        <p >Net Total : ₹1110</p>
                    </Stack>

                </Stack>

            </Box >

            <ProductsInOrder />

        </>
    )
}

export default OrderSummary
