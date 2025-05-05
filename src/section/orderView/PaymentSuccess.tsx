import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addOrderItem, generateOrder } from "../../utils/cartItem";
import Cookies from "js-cookie";
export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const hasVerified = useRef(false);
    const page = "paymentSuccess";
    const userId = Cookies.get("userId");
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/order"); // Adjust path if your cart route is different
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying payment...");

    useEffect(() => {
        const sessionId = searchParams.get("session_id");


        const deliveryForm = JSON.parse(localStorage.getItem("deliveryForm") || "{}");

        const verifyPayment = async () => {
            if (hasVerified.current) return;
            hasVerified.current = true;

            const res = await fetch(`http://localhost:3001/api/verify-payment?session_id=${sessionId}`);

            console.log("Verifying payment with session:", sessionId);
            const data = await res.json();

            console.log(data.status)

            if (data.status === "success") {
                const orderId = await generateOrder(userId);

                await addOrderItem(userId, orderId);

                const response = await fetch("http://localhost:3001/api/delivery/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...deliveryForm, user_id: userId
                    }),
                });

                const data = await response.json();
                console.log("Submitted data:", data, "in page: ", page);


            }
            setMessage(data.status === "success" ? "yes" : "fail");
            localStorage.removeItem("deliveryForm");
            return;
        };

        if (sessionId) verifyPayment();
    }, []);

    return (<>

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "auto",
            marginTop: "200px"
        }}>
            <Typography>{message}</Typography>;
        </Box>


    </>);

};

export default PaymentSuccess;
