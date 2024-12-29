import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FormProps, UserDataTypes } from "../types";
import { registerSchema } from "../../../validation/inputValidation";
const Form:React.FC <FormProps> = ({ type,onSubmit,error,onClearError} ) => {
  const [userData,setUserData]=useState<UserDataTypes>({
    email:"",
    password:"",
    username:""
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
const {name,value}=e.target
setUserData({
    //just change the data that have been changed in sucha way that the rest of the data remains the same
    ...userData,
    [name]:value,
})
  }
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(type==="Register"){
      const result = registerSchema.safeParse(userData);
      if (!result.success) {
        const errors = result.error.errors.map((err) => err.message);
        setValidationErrors(errors);
        return;
      }
    }
    setValidationErrors([]); 
    onSubmit(userData)
  }
  const showError = error || validationErrors.length > 0;
  return (
    <>
    {showError && (
        <div
          className={`mb-4 p-4 rounded flex justify-between items-center ${
            error ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <span>{error || validationErrors.join(", ")}</span>
          <button
            className="ml-4 font-bold hover:text-red-600 focus:outline-none"
            onClick={onClearError}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex items-center mt-0 justify-center h-screen">
        <div className="shadow-md p-10 w-[60%] max-w-md">
        
          <h1 className="text-center font-serif font-bold text-3xl mb-10">
            {type}
          </h1>
          
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            {type == "Register" && (
              <>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Username
                    </label>
                    </div>
                    </div>
                
              </>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-l  text-center pt-5 font-serif px-2 tracking-wider">
              {type === "Login" 
    ? "If you haven't registered, click here " 
    : "If you have already registered, click here "}
                <Link
                  to={type === "Register" ? "/login" : "/register"}
                  className="hover:text-blue-600 "
                >
                  {type === "Register" ? "   Login" : " Register"}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
