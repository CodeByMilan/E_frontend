import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  ItemDetails,
  OrderData,
  PaymentMethod,
} from "../../storetypes/checkoutTypes";
import { orderItem } from "../../store/checkoutSlice";
import { authStatus } from "../../storetypes/storeTypes";
import { Link, useNavigate } from "react-router-dom";
import {  setItems } from "../../store/cartSlice";

const Checkout = () => {
  const [message,setMessage]=useState<string|null>(null)
  const { items } = useAppSelector((state) => state.cart);
  const { khaltiUrl, checkoutStatus } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.cod
  );
  const [data, setData] = useState<OrderData>({
    phoneNumber: "",
    shippingAddress: "",
    totalAmount: 0,
    paymentDetails: { paymentMethod: PaymentMethod.cod },
    items: [],
  });

  const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedPaymentMethod = e.target.value as PaymentMethod;
    setPaymentMethod(selectedPaymentMethod);
    setData({
      ...data,
      paymentDetails: {
        paymentMethod: selectedPaymentMethod,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  let SubTotal = items.reduce(
    (total, item) => total + (item?.Product?.price * item?.quantity || 0),
    0
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemDetails: ItemDetails[] = items.map((item) => ({
      productId: item.Product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      ...data,
      items: itemDetails,
      totalAmount: SubTotal,
    };

    await dispatch(orderItem(orderData)).then(()=>{
      dispatch(setItems([]))
    })
  };
  useEffect(() => {
    console.log("hello from useEffect");
    if (khaltiUrl) {
      console.log("Redirecting to Khalti:", khaltiUrl);
      window.location.href = khaltiUrl;
      return;
    }
    if (checkoutStatus === authStatus.success) {
      setMessage("Order placed successfully")
      const timer = setTimeout(() => {
        navigate("/myorders");
      }, 2000); 
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
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {items.length > 0 &&
                    items.map((item) => (
                      <div
                        key={item.Product.id}
                        className="flex items-start gap-4"
                      >
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                          <img
                            src={item.Product.productImageUrl}
                            className="w-full object-contain"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-base text-white">
                            {item.Product.productName}
                          </h3>
                          <ul className="text-xs text-gray-300 space-y-2 mt-2">
                            <li className="flex flex-wrap gap-4">
                              Size <span className="ml-auto">37</span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Quantity{" "}
                              <span className="ml-auto">{item.quantity}</span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Price{" "}
                              <span className="ml-auto">
                                {item.Product.price}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white">
                  Sub Total{" "}
                  <span className="ml-auto">
                    $
                    {items.reduce(
                      (total, item) =>
                        total + item.Product.price * item.quantity,
                      0
                    )}
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-base text-gray-800 mb-4">Phone Number</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="string"
                      placeholder="Phone No."
                      name="phoneNumber"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      name="shippingAddress"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 relative flex">
                <h3 className="text-base text-gray-800 mb-4">Shipping Fee</h3>
                <span className="mx-20">$10</span>
              </div>
              <div className="mt-8 relative flex">
                <h3 className="text-base text-gray-800 mb-4">Total</h3>
                <span className="mx-20">${SubTotal + 10}</span>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">Payment Method</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={PaymentMethod.cod}
                      checked={paymentMethod === PaymentMethod.cod}
                      onChange={handlePaymentMethod}
                      className="mr-2"
                    />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={PaymentMethod.khalti}
                      checked={paymentMethod === PaymentMethod.khalti}
                      onChange={handlePaymentMethod}
                      className="mr-2"
                    />
                    Khalti
                  </label>
                </div>
              </div>

              {paymentMethod === PaymentMethod.khalti ? (
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="submit"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Pay with Khalti
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="submit"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    complete purchase
                  </button>
                </div>
              )}

              <div className="flex gap-4 max-md:flex-col mt-8">
                <Link to="/cart">
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
