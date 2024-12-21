import React, { useState } from 'react';
import { Product } from '../../../../storetypes/productTypes';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addToCart } from '../../../../store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import PopUp from '../../../../globals/components/popUp/PopUp';

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  if (!data) return <p>No data to display</p>;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useAppDispatch();
  const [modalMessage, setModalMessage] = useState<string>(""); 
  const [modalType, setModalType] = useState<"success" | "error" | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  const { user } = useAppSelector((state) => state.auth);
  const token = user?.token;

  const descriptionWords = data.description?.split(' ') || [];
  const truncatedDescription = descriptionWords.slice(0, 20).join(' ');

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    if (!token) {
      setModalMessage("Please log in to add the product to the cart.");
      setModalType("error");
      setIsModalOpen(true); 
      return;
    }
    dispatch(addToCart(data.id));
    setModalMessage("Your product has been successfully added to the cart! 🎉");
    setModalType("success");
    setIsModalOpen(true);
  };

  const handleAddToWishlist = () => {
    if (!token) {
      setModalMessage("Please log in to add the product to the wishlist.");
      setModalType("error");
      setIsModalOpen(true); 
      return;
    }
    //will do in future 
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
          <button
            type="button"
            onClick={handleAddToWishlist}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-lg font-medium leading-4 text-white shadow-sm hover:bg-gray-950"
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2 text-red-500" />
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text- font-medium leading-4 text-white shadow-sm hover:bg-gray-950"
          >
            <FontAwesomeIcon icon={faCartPlus} className="mr-2 text-white" />
          </button>
        </div>
      </div>

      <PopUp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        confirmText="OK"
        onConfirm={() => {
          setIsModalOpen(false);
          if (modalType === "error") {
          
          }
        }}
        showCancelButton={false}
      >
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${modalType === "error" ? "bg-red-600" : "bg-green-600"}`}>
            <span className="text-white text-3xl font-bold">!</span>
          </div>
        </div>
        <p className={`text-center ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
          {modalMessage}
        </p>
      </PopUp>
    </>
  );
};

export default Card;
