import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layouts/HomeLayout"
import { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../Redux/Slices/AuthSlice";
import { isEmail } from "../Helpers/regexMatcher";
import toast from "react-hot-toast";

function ForgotPassword() {

    const [inputEmail, setInputEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        if(!inputEmail) {
            toast.error("Enter a valid email id");
            return;
        }

        if(!isEmail(inputEmail)) {
            toast.error("Enter a valid email");
            return;
        }

        await dispatch(forgotPassword({email: inputEmail}));

        setInputEmail('');
        navigate("/");
    }


    
    return (
        <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form onSubmit={submitHandler} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                <h1 className='text-center text-2xl font-bold'> Forgot Password </h1>
    

    
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-semibold'> Registered Email </label>
                    <input 
                        type="text"
                        // required
                        name="email"
                        id="email"
                        placeholder='Enter your email....'
                        className='bg-transparent px-2 py-1 border' 
                        onChange={(e) => setInputEmail(e.target.value)}
                        value={inputEmail}
                    />
                </div>
                
                <button type="submit" className='mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                    Forgot Password
                </button>
    
    
                  <Link to="/user/profile">
                    <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 "> 
                      <AiOutlineArrowLeft></AiOutlineArrowLeft> Go back to Profile
                    </p>
                  </Link>
                 
            </form>
         </div>
       </HomeLayout>
      )
}

export default ForgotPassword
