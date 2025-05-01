import React, { useEffect } from "react";
import Lottie from "lottie-react";
import paymentFailAnimation from "../../assets/Images/PaymentFail.json";
import { useNavigate } from "react-router";

const PaymentFail: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/cart"); // Adjust path if your cart route is different
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#fff", // optional: gives a clean background
            }}
        >
            <Lottie
                animationData={paymentFailAnimation}
                loop={false}
                autoplay={true}
                style={{
                    width: 180,
                    height: 180,
                }}
            />
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#FF3B30", // red tone for error
                    marginTop: "20px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Payment Failed
            </h2>
            <p
                style={{
                    fontSize: "16px",
                    color: "#555",
                    marginTop: "10px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Redirecting to your cart shortly due to a payment issue.
            </p>
        </div>
    );
};

export default PaymentFail;
