import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoSajhaPasal from '../../../assets/logoSajhaPasal.png'
import { resetToken } from '../../../store/authSlice'
import { fetchCartItems } from '../../../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setSearchQuery } from '../../../store/searchSlice'
import { Mobile } from './Mobile'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const { items } = useAppSelector((state) => state.cart)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token || !!user.token)
    dispatch(fetchCartItems())
  }, [user.token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    dispatch(resetToken())
    navigate("/login")
  }

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value)); 
  };
  return (
    <>
    
      <nav className="bg-white shadow-lg dark:bg-gray-900"><Mobile/>
        <div className="sm:  hidden xl:max-w-screen-xl xl:flex xl:flex-wrap items-center justify-between mx-auto p-4 ">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logoSajhaPasal} className="h-16 w-16 mx-2 rounded-full shadow-md" alt="Sajha Pasal logo" />
            <span className="self-center text-4xl font-semibold text-black dark:text-white hover:text-black transition duration-300 ease-in-out">
              Sajha Pasal
            </span>
          </Link>
          <div className="flex text-3xl md:order-2">
            <ul className="flex flex-col p-3 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-2 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="block py-2 px-2 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                >
                  Shop Now
                </Link>
              </li>

              {!isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-2 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-2 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="block py-2 px-2 text-gray-900 rounded-md hover:bg-red-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myorders"
                      className="block py-2 px-2 text-gray-900 rounded-md hover:bg-red-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      My orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="relative block py-2 px-2 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      <FontAwesomeIcon icon={faHeart} className='text-black text-4xl'/>
                      <sup className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full px-2 py-1">
                        {0}
                      </sup>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="relative block py-2 px-3 text-gray-900 rounded-md hover:bg-blue-500 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300 ease-in-out"
                    >
                      <FontAwesomeIcon icon={faCartShopping} className='text-black text-4xl'/>
                      <sup className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full px-2 py-1">
                        {items.length}
                      </sup>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1 transition duration-300 ease-in-out"
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Search Products"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
