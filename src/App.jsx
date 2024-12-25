import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';     
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from './Components/Auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/Payment/Checkout';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import Displaylectures from './Pages/Dashboard/Displaylectures';
import Addlecture from './Pages/Dashboard/Addlecture';
import ChangePassword from './Pages/ChangePassword';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPasswordForm from './Pages/ResetPasswordForm';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/courses" element={<CourseList/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/denied" element={<Denied/>}></Route>
        <Route path="/course/description" element={<CourseDescription/>}></Route>

        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/reset" render={(props) => <UserPage {...props} />} element={<ResetPasswordForm />}></Route> 

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path="/course/create" element={<CreateCourse />}> </Route>
          <Route path="/course/addlecture" element={<Addlecture />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>}>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile/>}></Route>
          <Route path="/changepassword" element={<ChangePassword />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess/>}></Route>
          <Route path="/checkout/fail" element={<CheckoutFailure/>}></Route>
          <Route path="/course/displaylecture" element={<Displaylectures />}></Route>
        </Route>
        
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
