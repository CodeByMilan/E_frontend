import{ useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../globals/components/navbar/Navbar';
import Footer from '../../globals/components/footer/Footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {  verifyPaymentStatus } from '../../store/checkoutSlice';
import { authStatus } from '../../storetypes/storeTypes';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {status}=useAppSelector((state)=> state.order)
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Extract pidx from query parameters
    const queryParams = new URLSearchParams(location.search);
    const pidx = queryParams.get('pidx');
    
    //console.log('Extracted pidx:', pidx); 
    if (pidx) {
      console.log("i am from verify")
      dispatch(verifyPaymentStatus(pidx)).then(()=>{
        if(status==authStatus.success){
          setIsSuccess(true)
          setMessage('Payment verified successfully !!')
          setLoading(false)
        }
        else {
          setMessage('Payment verification failed. Missing payment ID.');
          setLoading(false);
        }
      })
    } 
  }, [location]);
 
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
