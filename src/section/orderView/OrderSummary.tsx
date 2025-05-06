import { Box, Stack } from "@mui/material"
import ProductsInOrder from "./ProductsInOrder"
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderData, getAddress } from "../../utils/address";
import { useNavigate, useParams } from "react-router";
import { getOrderItem } from "../../utils/ordersummary";
import { useEffect } from "react";
import { fetchCartItems } from "../../utils/cartItem";


const OrderSummary = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    console.log("chehcking orderid", id)


    const {
        data: items = [],
    } = useQuery({
        queryKey: ["cartItems"],
        queryFn: fetchCartItems,
    });

    //const userId = Cookies.get("userId");
    const userId = items.user?.userId;
    console.log("item's userId in orderSummary: ", items.user?.userId);

    useEffect(() => {
        // const storedId = Cookies.get("userId");
        const token = Cookies.get("authToken");

        if (!token) {
            navigate("/auth", { replace: true });
            return;
        }


    }, [navigate]);


    const { data: myOrders } = useQuery({
        queryKey: ["myOrders"],
        queryFn: () => fetchOrderData(userId!),

    });

    const { data: savedAddresses = [] } = useQuery({
        queryKey: ["address"],
        queryFn: () => getAddress(userId!),

    })
    const { data: getOrderItems } = useQuery({
        queryKey: ["getOrderItem"],
        queryFn: getOrderItem,
    });

    console.log("ORDERS: ", myOrders)
    console.log("ADDRESS: ", savedAddresses)
    console.log("orderitem: ", getOrderItems)

    // Avoid accessing data if not ready
    // if (isOrdersLoading || isAddressLoading || isItemsLoading) {
    //     return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;
    // }
    // Check auth token and redirect if missing
    // useEffect(() => {
    //     const token = Cookies.get("authToken");
    //     if (!token) {

    //         navigate("/auth", { replace: true });
    //     }
    // }, [authCheckTick, navigate]);

    // Every 1 seconds,  re-render
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setAuthCheckTick((prev) => prev + 1);
    //     }, 1000);

    //     return () => clearInterval(interval); 
    // }, []);

    // console.log(userId)
    console.log("savedAddresses", savedAddresses);

    const data = savedAddresses.find((o: { order: { order_id: string }; }) => o.order?.order_id === id);

    const matchedId = myOrders?.data?.find((o: { order_id: string }) => o.order_id === id);


    //console.log(matchedId);
    // if (isOrdersLoading || isAddressLoading || isItemsLoading) {
    //     return <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</p>;
    // }


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
                }}>Order #{id}</p>

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
                    }}>{data?.address}</p>

                    <hr style={{
                        width: "100%",
                        borderTop: "2px solid #ccc",
                        margin: "10px 0",
                        marginTop: "15px"
                    }} />
                    <Stack direction={'row'} spacing={2}>

                        <Stack>
                            <p style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                            }}>City</p>
                            <p style={{
                                textAlign: 'center',
                                color: "#7F8C8D",
                            }}>{data?.city}</p>
                        </Stack>


                        <Stack>
                            <p style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                            }}>State</p>
                            <p style={{
                                color: "#7F8C8D",
                                textAlign: 'center'
                            }}>{data?.state}</p>
                        </Stack>

                        <Stack>
                            <p style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                            }}>Country</p>
                            <p style={{
                                textAlign: 'center',
                                color: "#7F8C8D",
                            }}>{data?.country}</p>
                        </Stack>


                        <Stack>
                            <p style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                            }}>Phone</p>
                            <p style={{
                                textAlign: 'center',
                                color: "#7F8C8D",
                            }}>{data?.phone}</p>
                        </Stack>


                    </Stack>

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
                        <p >Total : ₹{matchedId?.price}</p>
                        <p >Discount : ₹0</p>
                        <p >Net Total : ₹{matchedId?.price}</p>
                    </Stack>

                </Stack>


            </Box >





            <ProductsInOrder products={getOrderItems?.filter((item: { order: { order_id: string }; }) => item.order.order_id === id) || []} />

        </>
    )
}

export default OrderSummary
