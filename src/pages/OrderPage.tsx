import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderData } from "../utils/address";
import { updateOrderId } from "../utils/deliverydetail";
import { fetchCartItems } from "../utils/cartItem";

const OrderPage = () => {

    const {
        data: items = [],
    } = useQuery({
        queryKey: ["cartItems"],
        queryFn: fetchCartItems,
    });

    // const userId = Cookies.get("userId");
    const userId = items.user?.userId;

    useEffect(() => {
        updateOrderId(userId, localStorage.getItem("orderId") || "");

    }, [])
    const [authCheckTick, setAuthCheckTick] = useState(0);


    const { data: myOrders } = useQuery({
        queryKey: ["myOrders", userId],
        queryFn: () => fetchOrderData(userId!),
        enabled: !!userId,
    });

    const navigate = useNavigate();
    // Check auth token and redirect if missing
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {

            navigate("/auth", { replace: true });
        }
    }, [authCheckTick, navigate]);

    // Every 1 seconds, increment tick to trigger re-render
    useEffect(() => {
        const interval = setInterval(() => {
            setAuthCheckTick((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);

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



                        <Link to={`/order/${order?.order_id}`} style={{ textDecoration: "none", color: "black" }}>
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
                                        backgroundColor: "#FFF3E0",
                                        color: "#FB8C00",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                        textTransform: "uppercase",
                                    }}>
                                        Placed
                                    </p>

                                </Stack>

                                <Stack alignItems="flex-end">
                                    <p>₹{order?.price}</p>
                                    <p>{order?.quantity} Products</p>




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
