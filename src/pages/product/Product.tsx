import { useEffect } from "react"
import Footer from "../../globals/components/footer/Footer"
import Navbar from "../../globals/components/navbar/Navbar"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchProducts } from "../../store/productSlice"
import { authStatus } from "../../storetypes/storeTypes"
import Card from "../home/components/elements/Card"


const Product = () => {
    const dispatch = useAppDispatch()
    const { status, product } = useAppSelector((state) => state.products)
    const {searchQuery} = useAppSelector((state) => state.search);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    if (status == authStatus.loading) {
        return <div>Loading...</div>
    }
   // console.log(product)
   // Filter products based on search query
   const filteredProducts = searchQuery
   ? product.filter((pd) =>
       pd.productName.toLowerCase().includes(searchQuery.toLowerCase())||pd.price.toString().includes(searchQuery)||pd.Category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
     )
   : product;
    return (
        <>
            <Navbar />
            <section className="py-4 m-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
                    {filteredProducts.length > 0 &&
                        filteredProducts.map((pd) => (
                            <div key={pd.id}>
                                <Card data={pd} />
                            </div>
                        ))}
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Product
