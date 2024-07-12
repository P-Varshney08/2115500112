import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  // const user = useSelector((state)=>{
  //   return state.user.userDetails;
  // })
  // const isLoggedIn = !!user;

  return (
    <>
    <BrowserRouter>
      <div className="flex overflow-auto bg-[#e6e6e6] min-h-screen">
        {/* {isLoggedIn && <Sidebar />} */}
        <div className='w-full mt-4'>
          {/* <Navbar /> */}
          <div className='flex justify-center'>
            <div className='w-full lg:w-full mt-4'>
              <ToastContainer />
              <Routes>
                {/* {isLoggedIn ? (
                  <>
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Navigate to='/' />} />
                    <Route path='/signup' element={<Navigate to='/' />} />
                  </>
                ) : ( */}
                  <>
                    {/* <Route path='*' element={<Navigate to="/signin" />} /> */}
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                  </>
                {/* )} */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
      {/* <BuyLoanButton />  */}
      {/* <Chatbot/> */}
    </BrowserRouter>
    </>
  )
}

export default App;
