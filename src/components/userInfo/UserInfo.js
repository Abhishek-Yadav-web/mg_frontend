import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getUserInfo } from '../../redux/action/action';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './UserInfo.css'

toast.configure();

const UserInfo = () => {
    const {email} = useParams();
    const dispatch = useDispatch();

    const getUserInfoBackend = async() => {
        await axios({
            method : "GET",
            url : `http://localhost:8080/api/v1/user/${email}`,
            headers : {
                'Content-Type' : "application/json"
            }
        }).then((res) => {
            dispatch(getUserInfo(res.data.data))
        })
    }

    useEffect(() => {
        getUserInfoBackend();
    },[])

    const uInfo = useSelector((state) => state.userInfoReducer.userData);

    const [message,setMessage] = useState('');
    const [msgInfoEmail,setMsgInfoEmail] = useState('')
    

    const onSubmit = async() => {
        if(!message){
            return toast.warning(`Select Message`)
        }

        const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if(!msgInfoEmail || !emailRegEx.test(msgInfoEmail)){
            return toast.warning("Invalid Email.");
        }

        const body = JSON.stringify({
            "from" : msgInfoEmail,
            "to" : uInfo?.user?.userEmail,
            "message" : message 
        })

        await axios({
            method : "POST",
            url : "http://localhost:8080/api/v1/user/sendMessage",
            headers : {
                "Content-Type" : 'application/json'
            },
            data : body
        }).then(() => {
            toast.success("Message Sent")
        })
    }


  return (
    <div className='QrCode__Container'>
    <div className="imgBx">
        <img src={`https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} alt={`alt`} />
    </div>
    <div className="QrCode__Container-contentContainer">
        <div className="-contentContainer__contentBx">
            <div>
                <h1>Contact Info</h1>
                <h3><span style={{color : 'crimson'}}>{uInfo?.user?.name}</span> | {uInfo?.user?.vehicleNo}</h3>
                <div className='__Form'>
                    <div className='__rBx' >
                        <input type="radio" name='r1' value={'Your Car is on No Parking'} onChange={(e) => {setMessage(e.target.value)}}/> Your Car is on No Parking
                    </div>
                    <div className='__rBx'>
                        <input type="radio" name='r1' value={`The Car is getting Towed`} onChange={(e) => {setMessage(e.target.value)}}/> The Car is getting Towed
                    </div>
                    <div className='__rBx'>
                        <input type="radio" name='r1' value={`Window is Open`} onChange={(e) => {setMessage(e.target.value)}}/> Window is open
                    </div>

                    <p style={{marginTop : "20px"}}>Your Contact Info</p>
                    <input type="emai" placeholder='Enter Your Email' className='__msgInfo' onChange={(e) => {setMsgInfoEmail(e.target.value)}} value={msgInfoEmail}/>
                    <button onClick={onSubmit}>message</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserInfo