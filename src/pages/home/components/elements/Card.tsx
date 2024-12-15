import React, { useState } from 'react';
import { Product } from '../../../../storetypes/productTypes';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addToCart } from '../../../../store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  if (!data) return <p>No data to display</p>;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null); 
  const { user } = useAppSelector((state) => state.auth);
  const token = user?.token;
  console.log(token);
  const descriptionWords = data.description?.split(' ') || [];
  const truncatedDescription = descriptionWords.slice(0, 20).join(' ');

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    if (!token) {
      setError("Please log in to add the product to the cart.");
      return;
    }
    // If logged in, dispatch the addToCart action
    dispatch(addToCart(data.id));
  };

  const handleAddToWishlist = () => {
    if (!token) {
      setError("Please log in to add the product to the wishlist.");
      return;
    }
  
  };

  return (
    <>
      <Link
        className="p-3 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
        to={`/product/${data.id}`}
      >
        <div className="w-full min-h-72 overflow-hidden">
          <img
            src={data?.productImageUrl}
            className="w-full h-72 object-cover rounded-lg"
            alt="Product Image"
          />
        </div>
      </Link>

      <div className="mt-8 w-full">
        <h4 className="font-bold text-xl">{data?.productName}</h4>
        <p className="mt-2 text-gray-600">Rs {data?.price}</p>
        
        <p className="mt-2 text-gray-600">
          {showFullDescription
            ? data?.description
            : `${truncatedDescription}...`}
        </p>
        {!showFullDescription && (
          <button
            className="text-grey-500 text-sm mt-2"
            onClick={handleToggleDescription}
          >
            See More
          </button>
        )}
         
        <div className="flex gap-10 mt-5 ml-5">
          {/* Add to Wishlist Button with Heart Icon */}
          <button
            type="button"
            onClick={handleAddToWishlist}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-lg font-medium leading-4 text-white shadow-sm hover:bg-gray-950"
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2 text-red-500" />
    
          </button>
          
          {/* Add to Cart Button with Cart Icon */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text- font-medium leading-4 text-white shadow-sm hover:bg-gray-950"
          >
            <FontAwesomeIcon icon={faCartPlus} className="mr-2 text-white" />
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error if user is not logged in */}
      </div>
    </>
  );
};

export default Card;
