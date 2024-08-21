import './App.css';
//importing neccesary components and function from the react-router-dom library for  routing purposes.
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from './Components/Home/PropertyList';
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import {Flip,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { currentUser } from './Store/User/user-action';
import { userActions } from './Store/User/user-slice';
import Login from './Components/User/Login';
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from  "./Components/User/ForgotPassword";
// import ResetPassword from "./Components/User/ResetPassword";
import Payment from "./Components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import{ loadStripe } from "@stripe/stripe-js";
import MyBookings from "./Components/MyBookings/MyBookings";
import BookingDetails from "./Components/MyBookings/BookingDetails";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51OtMYeSBiEsUffQGSC6Wot9TdGVtc3NNsXSk6iF6leRJty2EvQ73EEDt9q6nLdPAzNOCMDH2k1SIrADPokAYUJSD00BqhIS6qP"
   );
  const dispatch = useDispatch();
  const {errors}=useSelector((state)=>state.user);
  useEffect(()=>{
    if(errors){
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  },[errors,dispatch]);
  //manages the  routes of our app using createBrowserRouter method which is a part of react-router-dom library
  const router =createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      
      //routes are created by passing a path as the first parameter and what component should be rendered when that path
      //exact properties ensure that route matches exactly that u gave in path
      <Route path="/" element={<Main/>} id="main" exact>
        <Route id="home" index element={<PropertyList/>} exact/> 
        <Route element={<PropertyDetails/>}
         id ="PropertyDetails"
        path="propertylist/:id"
        exact
        />
        <Route path='/login' element={<Login/>}></Route>
        <Route id="signup" path="signup" element={<Signup />} />
        <Route  id="profile" path="profile" element={<Profile />} />
        <Route id="editprofile" path="editprofile" element={<EditProfile />} />
        <Route id="updatepassword" path="user/updatepassword" element={<UpdatePassword />} />
        <Route id="forgotpassword" path="user/forgotpassword" element={<ForgotPassword />} />
        {/* <Route id="resetpassword" path="user/resetPassword/:token" element={<ResetPassword />} /> */}
        <Route id="payment" path="payment/:propertyId" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        <Route id="mybookings" path="user/booking" element={<MyBookings />} />
        <Route id="bookingdetails" path="user/booking/:bookingId" element={<BookingDetails />} />
          </Route>
    )
  )
  return (
    <div className="App">
      {/* this ensure that the routing function is available throughout the application */}
      <RouterProvider router={router}/>
      <ToastContainer
      position="bottom-center"
      autoClose={1000}
      draggable={true}
      transition={Flip}
      />
    </div>
  );
}

export default App;