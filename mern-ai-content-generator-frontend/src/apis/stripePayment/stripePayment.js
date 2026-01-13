import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/api/v1/stripe";
//=======Stripe Payment=====

export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/free-plan`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Stripe  Payment intent=====

export const createStripePaymentIntentAPI = async (payment) => {
  console.log(payment);
  const response = await axios.post(
    `${BASE_URL}/checkout`,
    {
      amount: Number(payment?.amount),
      subscriptionPlan: payment?.plan,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Verify  Payment =====

export const verifyPaymentAPI = async (paymentId) => {
  const response = await axios.post(
    `${BASE_URL}/verify-payment/${paymentId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};