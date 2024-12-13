import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
        <div className="bg-white p-8 shadow-md rounded-lg text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
            <button 
                onClick={() => navigate('/')} 
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                Go to Home
            </button>
        </div>
    </div>
  );
}

export default PaymentSuccess;