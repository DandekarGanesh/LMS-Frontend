import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { editPassword } from '../Redux/Slices/AuthSlice';

function ChangePassword() {

    const [userInput, setUserInput] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onChangeHandler(e) {
      const {name, value} = e.target;
      
      setUserInput({
          ...userInput,
          [name]: value
      });
    }


    async function onSubmitHandler(e) {
      e.preventDefault();

      if(!userInput.oldPassword || !userInput.newPassword) {
        toast.error("All Fiels required");
      }

      if(userInput.oldPassword === userInput.newPassword) {
        toast.error("old and new password are same");
        return;
      }

      await dispatch(editPassword(userInput));

      setUserInput({
        oldPassword: "",
        newPassword: ""
      });

      navigate("/user/profile");
    }



  return (
    <HomeLayout>
    <div className='flex items-center justify-center h-[100vh]'>
        <form onSubmit={onSubmitHandler} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <h1 className='text-center text-2xl font-bold'> Login Page </h1>



            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'> Old Password </label>
                <input 
                    type="password"
                    // required
                    name="oldPassword"
                    id="password"
                    placeholder='old password....'
                    className='bg-transparent px-2 py-1 border' 
                    onChange={onChangeHandler}
                    value={userInput.oldPassword}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'> New Password </label>
                <input 
                    type="password"
                    // required
                    name="newPassword"
                    id="password"
                    placeholder='new Password....'
                    className='bg-transparent px-2 py-1 border' 
                    onChange={onChangeHandler}
                    value={userInput.newPassword}
                />
            </div>
            
            <button type="submit" className='mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                Change Password  
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

export default ChangePassword;
