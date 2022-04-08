import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/action/action'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

toast.configure();

const Register = () => {

    const [userData,setUserData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async() => {
        const {name,email,mNo,vNo} = userData

        if(!name|| name.length < 4){
            return toast.warning('Name Must Be Grater Than 3 Char.');
        }

        const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if(!email || !emailRegEx.test(email)){
            return toast.warning("Invalid Email.");
        }
        
        if(!mNo || mNo.length !== 10 ){
            if(!Number(mNo)){
                return toast.warning("Moblie No. Must have be number");
            }else{
                return toast.warning("Moblie No. Must have 10 digit.");
            }
        }
        
        if(!vNo || vNo.length !== 5){
            return toast.warning("Vechile No. Must have 5 digit.");
        }

        dispatch(registerUser({name,email,mNo,vNo}))
        const body = JSON.stringify({
            name , uEmail : email
        })

        await axios({
            method : "POST",
            url : `http://localhost:8080/api/v1/resigter`,
            headers : {
                'Content-Type' : 'application/json'
            },
            data : body
        }).then(() => {
            toast.success(`OTP Has send on your email`)
            navigate('/verify/OTP')
        }).catch(() => {
            toast.error(`User Already Register`)
        })
        
    }

  return (
    <>
        <div className='Register__container'>
            <div className="Scanner__Container-contentContainer">
            <div className="-contentContainer__contentBx">
                <div className="__contentBx-logo">
                    <img src="./assest/img/user.png" alt="" />
                </div>
                <div>
                    <h1>Register Account</h1>
                    <h3> Create your own QR-code.</h3>
                </div>
                <div className='__contentBx-form'>
                    <input type="text" placeholder='Enter Your Name' onChange={(e) => {setUserData({...userData, name : e.target.value})}} value={userData.name}/>
                    <input type="email" placeholder='Enter Your Email' onChange={(e) => {setUserData({...userData ,email : e.target.value})}} value={userData.email}/>
                    <input type="text" placeholder='Enter Your Mobile No.' onChange={(e) => {setUserData({...userData ,mNo : e.target.value})}} value={userData.mNo}/>
                    <input type="text" placeholder='Enter Your Vechile No.' onChange={(e) => {setUserData({...userData ,vNo : e.target.value})}} value={userData.vNo} />
                    <button onClick={onSubmit}>Register</button>
                </div>
                <div style={{justifyContent:"flex-start",width:"100%",padding:"10px 40px"}}>
                    <p>Already Have QR-code? <Link exact to={'/get/qr-code'}>Get Here.</Link></p>
                </div>
            </div>
            </div>
            <div className="imgBx">
                <img src={`https://images.unsplash.com/photo-1523759533935-e4b770303b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80`} alt="alt" />
            </div>
        </div>
    </>
  )
}

export default Register