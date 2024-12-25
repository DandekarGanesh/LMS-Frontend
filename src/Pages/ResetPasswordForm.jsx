import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../Redux/Slices/AuthSlice";

function ResetPasswordForm() {

    const [searchParams, setSearchParams] = useSearchParams();
    const resetToken = searchParams.get("resetToken");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        password: "",
        conformPassword: ""
    });


    async function submitHandler(e) {
        e.preventDefault();

        if(inputData.password !== inputData.conformPassword) {
            toast.error("password and Conform password must me Same");
            return;
        }

        await dispatch(resetPassword({
            password: inputData.password,
            resetToken: resetToken
        }));

        setInputData('');
        navigate('/login');
    }





    function inputHandler(e) {
        const { name, value } = e.target;

        setInputData({
            ...inputData,
            [name]: value
        });
    }


  return (
    <HomeLayout>
    <div className='flex items-center justify-center h-[100vh]'>
        <form onSubmit={submitHandler} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <h1 className='text-center text-2xl font-bold'> Reset Password </h1>



            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'> New Password </label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Enter new Password....'
                    className='bg-transparent px-2 py-1 border' 
                    onChange={inputHandler}
                    value={inputData.password}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="conformPassword" className='font-semibold'> Conform Password </label>
                <input 
                    type="password"
                    name="conformPassword"
                    id="conformPassword"
                    placeholder='Conform Password....'
                    className='bg-transparent px-2 py-1 border'
                    onChange={inputHandler} 
                    value={inputData.conformPassword}
                />
            </div>
            
            <button type="submit" className='mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                Change Password
            </button>


              <Link to="/">
                <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 "> 
                  <AiOutlineArrowLeft></AiOutlineArrowLeft> Go back to Home
                </p>
              </Link>
             
        </form>
     </div>
   </HomeLayout>
  )
}



export default ResetPasswordForm;
