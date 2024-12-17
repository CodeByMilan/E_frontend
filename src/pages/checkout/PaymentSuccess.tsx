import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../globals/components/navbar/Navbar';
import Footer from '../../globals/components/footer/Footer';
import { useAppDispatch } from '../../store/hooks';
import axios from 'axios';
import { updatePaymentStatusInStore } from '../../store/checkoutSlice';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Extract pidx from query parameters
    const queryParams = new URLSearchParams(location.search);
    const pidx = queryParams.get('pidx');
    
    console.log('Extracted pidx:', pidx); // Debugging: Check if pidx is extracted correctly

    if (pidx) {
      verifyPayment(pidx);
    } else {
      setMessage('Payment verification failed. Missing payment ID.');
      setLoading(false);
    }
  }, [location]);

  const verifyPayment = async (pidx: string) => {
    console.log('Starting payment verification for pidx:', pidx); // Debugging: Log pidx before making request
    
    try {
      // Call backend API to verify payment with pidx
      const response = await axios.post(
        'http://localhost:5000/api/order/verify-transaction',
        { pidx },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        }
      );

      // Log the response from the backend
      console.log('Payment verification response:', response.data); 

      if (response.data.message === 'payment verify successfully') {
        setMessage('Payment successful! Thank you for your purchase.');
        setIsSuccess(true);

        // Dispatch the payment status update to Redux store
        dispatch(updatePaymentStatusInStore({
          status: 'paid', // Assuming the payment status is 'paid'
          orderId: response.data.orderId, // The order ID from the response
        }));
      } else {
        setMessage('Payment failed. Please try again.');
        setIsSuccess(false);
      }
    } catch (err) {
      console.error('Error occurred during payment verification:', err); // Debugging: Log error if request fails
      setMessage('Error occurred during payment verification.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-green-50">
        <div className="bg-white p-8 shadow-md rounded-lg text-center">
          <h1 className={`text-3xl font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'} mb-4`}>
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>
          <p className="text-gray-700 mb-6">{message}</p>
          {loading ? (
            <p>Verifying payment...</p>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Go to Home
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
