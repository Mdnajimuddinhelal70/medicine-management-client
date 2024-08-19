import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const [error, setErro] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log("Client Secret:", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Payment Intent creation error:", err);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setErro(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setErro("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Complete Your Payment
        </h2>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  fontFamily: "Roboto, sans-serif",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border rounded-md focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full py-2 px-4 bg-violet-700 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Pay Now
        </button>
        <p className="text-red-700">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
