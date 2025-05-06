import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addOrderItem, fetchCartItems, generateOrder } from "../../utils/cartItem";
import { useQuery } from "@tanstack/react-query";
export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const hasVerified = useRef(false);
    //const userId = Cookies.get("userId");

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/order"); // Adjust path if your cart route is different
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying payment...");

    //----------------------------------------------------- issue area ------------------------------------------------------------
    //issue description:- here if i comment out userId, then it will not work but otherwise it will show me log that is given below.
    const {
        data: items = [],
        isLoading
    } = useQuery({
        queryKey: ["cartItems"],
        queryFn: fetchCartItems,
    });

    const userId = items.user?.userId;
    console.log("items.user?.userId inside payment success", items.user?.userId);
    //------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {

        if (isLoading || !userId) return; // Don't proceed until data is ready


        const sessionId = searchParams.get("session_id");

        const verifyPayment = async () => {
            if (hasVerified.current) return;
            hasVerified.current = true;

            const res = await fetch(`http://localhost:3001/api/verify-payment?session_id=${sessionId}`);

            console.log("Verifying payment with session:", sessionId);
            const data = await res.json();

            if (data.status === "success") {

                const orderId = await generateOrder(userId);
                await addOrderItem(userId, orderId);

                const deliveryForm = JSON.parse(localStorage.getItem("deliveryForm") || "{}");
                const fullDeliveryData = {
                    ...deliveryForm,
                    user_id: userId,
                    order_id: orderId,
                };
                console.log("fullDeliveryData", fullDeliveryData)
                const response = await fetch("http://localhost:3001/api/delivery/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(fullDeliveryData),
                });
                const data = await response.json();
                console.log("Submitted data:", data);
            }

            setMessage(data.status === "success" ? "yes" : "fail");
            localStorage.removeItem("deliveryForm");
            return;
        };

        if (sessionId) verifyPayment();
    }, [isLoading, userId]);

    return (<>

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "auto",
            marginTop: "200px"
        }}>
            <Typography>{message}</Typography>
        </Box>

    </>);

};

export default PaymentSuccess;
