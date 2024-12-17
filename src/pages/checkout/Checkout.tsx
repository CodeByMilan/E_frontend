import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemDetails, OrderData, PaymentMethod } from "../../storetypes/checkoutTypes";
import { orderItem } from "../../store/checkoutSlice";
import { authStatus } from "../../storetypes/storeTypes";
import { Link, useNavigate } from "react-router-dom";
import { setItems } from "../../store/cartSlice";
import Footer from "../../globals/components/footer/Footer";

const Checkout = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.cod);
  const [data, setData] = useState<OrderData>({
    phoneNumber: "",
    shippingAddress: "",
    totalAmount: 0,
    paymentDetails: { paymentMethod: PaymentMethod.cod },
    items: [],
  });

  const { items } = useAppSelector((state) => state.cart);
  const { khaltiUrl, checkoutStatus } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const SubTotal = items.reduce(
    (total, item) => total + (item?.Product?.price * item?.quantity || 0),
    0
  );

  const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedPaymentMethod = e.target.value as PaymentMethod;
    setPaymentMethod(selectedPaymentMethod);
    setData((prev) => ({
      ...prev,
      paymentDetails: { paymentMethod: selectedPaymentMethod },
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.phoneNumber || !data.shippingAddress) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const itemDetails: ItemDetails[] = items.map((item) => ({
      productId: item.Product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      ...data,
      items: itemDetails,
      totalAmount: SubTotal,
    };

    try {
      await dispatch(orderItem(orderData));
    } catch (error) {
      setMessage("An error occurred while placing the order. Please try again.");
      return;
    }

    if (paymentMethod === PaymentMethod.cod) {
      dispatch(setItems([]));
    }
  };

  useEffect(() => {
    if (khaltiUrl) {
      window.location.href = khaltiUrl;
    } else if (checkoutStatus === authStatus.success) {
      setMessage("Order placed successfully!");
      dispatch(setItems([])); // Clear cart after successful checkout
      const timer = setTimeout(() => navigate("/myorders"), 2000);
      return () => clearTimeout(timer);
    }
  }, [checkoutStatus, khaltiUrl]);

  return (
    <>
      <Navbar />
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-black rounded flex justify-between items-center">
          <span>{message}</span>
          <button
            className="ml-4 text-green font-bold hover:text-green focus:outline-none"
            onClick={() => setMessage(null)}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative ">
              <div className="px-4 py-8  sm:overflow-auto sm:h-[calc(100vh-60px)]">
                {items.length > 0 &&
                  items.map((item) => (
                    <div key={item.Product.id} className="flex items-start gap-4">
                      <div className="w-32 h-28 flex mb-5 p-2 bg-gray-300 rounded-md">
                        <img src={item.Product.productImageUrl} className="w-full object-contain" />
                      </div>
                      <div className="w-full">
                        <h3 className="text-base text-white">{item.Product.productName}</h3>
                        <ul className="text-xs text-gray-300 space-y-2 mt-2">
                          <li>Quantity: {item.quantity}</li>
                          <li>Price: ${item.Product.price}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                <div className="p-4 bg-gray-800">
                  <h4 className="text-white">Sub Total: ${SubTotal}</h4>
                </div>
              </div>

            </div>
          </div>

          {/* Checkout Form */}
          <div className="max-w-4xl w-full px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="mb-4">Phone Number</h3>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone No."
                  className="w-full px-4 py-3 bg-gray-100 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-8">
                <h3 className="mb-4">Shipping Address</h3>
                <input
                  type="text"
                  name="shippingAddress"
                  placeholder="Address"
                  className="w-full px-4 py-3 bg-gray-100 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-8">
                <h3>Payment Method</h3>
                <div className="flex gap-4 mt-4">
                  <label>
                    <input
                      type="radio"
                      value={PaymentMethod.cod}
                      checked={paymentMethod === PaymentMethod.cod}
                      onChange={handlePaymentMethod}
                    />
                    Cash on Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={PaymentMethod.khalti}
                      checked={paymentMethod === PaymentMethod.khalti}
                      onChange={handlePaymentMethod}
                    />
                    Khalti
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`mt-8 w-full py-3 rounded-md ${paymentMethod === PaymentMethod.khalti ? "bg-purple-600" : "bg-blue-600"
                  } text-white`}
              >
                {paymentMethod === PaymentMethod.khalti ? "Pay with Khalti" : "Complete Purchase"}
              </button>
              <Link to="/cart" className="block mt-4 text-center text-gray-800">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
