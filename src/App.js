import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import './App.css';
import QrCode from './components/qrCode/QrCode';
import Register from './components/register/Register';
import Scanner from './components/scanner/Scanner';
import UserInfo from './components/userInfo/UserInfo';
import Verify from './components/verifyOTP/Verify';
import { getUserQR } from './redux/action/action';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getQrcode = JSON.parse(localStorage.getItem("qrcode"))
    dispatch(getUserQR(getQrcode))
  },[])
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Scanner />} />
        <Route exact path='/register' element={<Register />} />
        <Route  exact path='/verify/OTP' element={<Verify />} />
        <Route exact path='/QrCode' element={<QrCode />} />
        <Route exact path='/ContactOwnerVeh_Mob/:email' element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
