import { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderData } from "../utils/address";

const OrderPage = () => {
    const [isPaid, setIsPaid] = useState(false); // initial state: not paid
    const userId = Cookies.get("userId");
    const handlePayment = () => {
        // simulate payment processing
        setIsPaid(true); // update state to paid
    };

    const { data: myOrders } = useQuery({
        queryKey: ["myOrders", userId],
        queryFn: () => fetchOrderData(userId!),
        enabled: !!userId,
    });

    return (
        <>
            <p style={{
                marginTop: "120px",
                fontSize: "30px",
                marginInline: "60px",
                fontWeight: "500",
                fontFamily: "Poppins",
            }}>Your Orders</p>

            {
                !myOrders ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        backgroundColor: "#f4f6f9",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px #0000001a",
                        marginInline: {
                            xs: "20px",
                            sm: "80px",
                            md: "80px",
                            lg: "80px",
                        },
                    }}>
                        <p style={{ fontFamily: "Poppins" }}>Loading orders...</p>
                    </Box>
                ) : myOrders.data?.length === 0 ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        backgroundColor: "#f4f6f9",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px #0000001a",
                        marginInline: {
                            xs: "20px",
                            sm: "80px",
                            md: "80px",
                            lg: "80px",
                        },
                    }}>
                        <p style={{ fontFamily: "Poppins", textAlign: "center" }}>You have no orders yet.</p>

                    </Box>
                ) : (
                    myOrders?.data.map((order: any) => (



                        <Link to="/order/1" style={{ textDecoration: "none", color: "black" }}>
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
                                marginTop: "20px",
                                backgroundColor: "#f4f6f9",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 4px #0000001a",
                                ":hover": {
                                    boxShadow: "5px 5px 10px 5px #0000001a",
                                    transition: "box-shadow 0.3s ease-in-out",
                                }
                            }}>

                                <Stack>
                                    <p>Order #{order?.order_id}</p>
                                    <p>{order?.updated_at}</p>
                                </Stack>

                                <Stack direction="column" spacing={1} alignItems="center">
                                    <p style={{
                                        backgroundColor: isPaid ? "#E6F4EA" : "#FFF3E0",
                                        color: isPaid ? "#4CAF50" : "#FB8C00",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                        textTransform: "uppercase",
                                    }}>
                                        {isPaid ? "Placed" : "Not Placed"}
                                    </p>

                                </Stack>

                                <Stack alignItems="flex-end">
                                    <p>₹{order?.price}</p>
                                    <p>{order?.quantity} Products</p>

                                    {!isPaid && (
                                        <Button

                                            variant="contained"
                                            size="small"
                                            sx={{ textTransform: "none", marginTop: "10px", fontSize: "12px", backgroundColor: "orange" }}
                                            onClick={handlePayment}
                                        >
                                            Pay Now
                                        </Button>
                                    )}
                                </Stack>



                            </Box>
                        </Link>

                    ))
                )
            }







        </>
    );
};

export default OrderPage;
