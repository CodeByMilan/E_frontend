import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductById } from "../../store/productSlice";
import { addToCart, setStatus } from "../../store/cartSlice";
import Navbar from "../../globals/components/navbar/Navbar";
import { authStatus } from "../../storetypes/storeTypes";
import Footer from "../../globals/components/footer/Footer";
import PopUp from "../../globals/components/popUp/PopUp";

const SingleProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalType, setModalType] = useState<"success" | "error" | null>(null); // Track modal type

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { singleProduct } = useAppSelector((state) => state.products);
    const { status: cartStatus } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);
    const token = user?.token;
    console.log("single page ",token)
    const navigate = useNavigate(); 

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (id && singleProduct) {
            dispatch(addToCart(id)).then(()=>{
                if (cartStatus === authStatus.error) {
                    const validation = localStorage.getItem("token");
                    if (validation) {
                        dispatch(setStatus(authStatus.loading));
                    } else {
                        setModalMessage("Please log in to add the product to the cart.");
                        setModalType("error");
                        setIsModalOpen(true); 
                    }
                }else if(cartStatus==authStatus.success){
                    setModalMessage("Your product has been successfully added to the cart! 🎉");
                    setModalType("success");
                    setIsModalOpen(true); 
                }
            })
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[600px] w-full rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img
                                    className="w-full h-full object-cover"
                                    src={singleProduct?.productImageUrl}
                                    alt="Product Image"
                                />
                            </div>
                            <div className="flex -mx-2 mb-4 text-2xl">
                                <div className="w-1/2 px-10">
                                    <button
                                        className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="w-1/2 px-2">
                                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4 text-2xl p-5">
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-5">
                                {singleProduct?.productName}
                            </h2>
                            <div className="flex mb-3">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        Rs {singleProduct?.price}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Product Description:
                                </span>
                                <p className="text-gray-600 dark:text-gray-300 text-xl mt-2">
                                    {singleProduct?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Success/Error */}
            <PopUp
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                confirmText="OK"
                onConfirm={() => {
                    setIsModalOpen(false);
                    if (modalType === "error") {
                        navigate("/login"); 
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

            <Footer />
        </>
    );
};

export default SingleProduct;
