import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createAccount } from '../Redux/Slices/AuthSlice';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher';


function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPrevewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        
        setSignupData({
            ...signupData,
            [name]: value
        });
    }


    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];  // getting image

        if(uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function() {
                setPrevewImage(this.result);
            });
        }

    }


    const createNewAccount = async (e) => {
        e.preventDefault();
        if(!signupData.fullName || !signupData.email || !signupData.password) {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length
        if(signupData.fullName.trim().length <= 4) {
            toast.error("Name should be at least 5 character");
            return;
        }

        // check valid email
        if(!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        // check password validations
        if(!isValidPassword(signupData.password)) {
            toast.error("password should be 6 - 16 character long with at least a number and a special character");
            return;
        }

        const formData = new FormData();
        formData.append('fullName', signupData.fullName);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('avatar', signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));

        if(response?.payload?.success)
        navigate('/');
        
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });

        setPrevewImage("");
    }




  return (
    <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                <h1 className='text-center text-2xl font-bold'> Registration Page </h1>

                <label htmlFor="image_uploads" className='cursor-pointer'>
                   { previewImage ? (
                       <img src={previewImage} alt="" className='w-24 h-24 rounded-full m-auto' />
                   ) : (
                       <BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>
                   ) }
                </label>

                <input 
                    onChange={getImage}
                    type="file" 
                    className='hidden'
                    id='image_uploads'
                    accept=".jpg, .jpeg, .png, .svg"
                    name='image_uploads'
                />

                
                <div className='flex flex-col gap-1'>
                    <label htmlFor="fullName" className='font-semibold'> Full Name </label>
                    <input 
                        type="text"
                        // required
                        name="fullName"
                        id="fullName"
                        placeholder='Enter your full Name....'
                        className='bg-transparent px-2 py-1 border' 
                        onChange={handleUserInput}
                        value={signupData.fullName}
                    />
                </div>


                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-semibold'> Email </label>
                    <input 
                        type="text"
                        // required
                        name="email"
                        id="email"
                        placeholder='Enter your email....'
                        className='bg-transparent px-2 py-1 border' 
                        onChange={handleUserInput}
                        value={signupData.email}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-semibold'> Password </label>
                    <input 
                        type="password"
                        // required
                        name="password"
                        id="password"
                        placeholder='Enter your password....'
                        className='bg-transparent px-2 py-1 border' 
                        onChange={handleUserInput}
                        value={signupData.password}
                    />
                </div>
                
                <button type="submit" className='mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                    Create account 
                </button>

                <p className='text-center'>
                   Already have an account ? <Link className="link text-accent cursor-pointer" to="/login"> Login </Link>
                </p>
                 
            </form>
        </div>
    </HomeLayout>
  )
}

export default SignUp
