import { loadStripe } from '@stripe/stripe-js';

export const makePayment = async (userId: string, orderId: string, price: number) => {
  console.log("makePayment called with:", { userId, orderId, price });
  const stripe = await loadStripe("pk_test_51RJB14Q8xVjB3HiCwEfzvDqmNS8JbN4UjGgnGxAY3aYZbgMLUmdusnAdYcGyb4f9pWdcwfnzmPmupEdGulAEEiTt00sKhzNoeU");

  const body = {
    paymentInfo:
    {
      userId: userId,
      orderId: orderId,
      totalPrice: price,

    }

  }

  const headers = {
    "Content-Type": "application/json"
  }

  const response = await fetch("http://localhost:3001/api/create-checkout-session", {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  const session = await response.json();

  stripe?.redirectToCheckout({
    sessionId: session.id
  });



}