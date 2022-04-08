import React, { useState } from 'react'
import './Verify.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getUserQR } from '../../redux/action/action';

toast.configure();

const Verify = () => {
    const [otp,setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userDataReducer.userData);
    const onSubmit = async() => {
        if(!otp || otp.length !== 4){
            return toast.error(`Enter 4 digit OTP`)
        }

        const {name,email,mNo,vNo} = userData
        const body = JSON.stringify({
            name,uEmail : email,mNo,vNo
        })
        await axios({
            method : "POST",
            url : `http://localhost:8080/api/v1/validate/otp/${otp}`,
            headers : {
                "Content-Type" : "application/json"
            },
            data : body
        }).then((res) => {
            dispatch(getUserQR(res.data.data))
            toast.success(`User Successfully activated`);
            navigate('/QrCode');
        }).catch((err) => {
            toast.error(`Wrong OTP`);
            navigate('/register')
        })

        

    }

  return (
    <>
        <div className="Verify_Container">
        <div className="Scanner__Container-contentContainer">
            <div className="-contentContainer__contentBx">
                <div>
                    <h1>Verify Account</h1>
                    <h3>Enter Your OTP to activate account.</h3>
                </div>
                <div className='__contentBx-form'>
                    <input type="text" placeholder='Enter Your OTP'  onChange={(e) => {setOtp(e.target.value)}} value={otp}/>
                    <button onClick={onSubmit}>Verify</button>
                </div>
            </div>
            </div>
            <div className="imgBx">
                <img src={`https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVzc2FnZXN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`} alt="" />
            </div>
        </div>
    </>
  )
}

export default Verify