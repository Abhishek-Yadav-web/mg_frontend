import React from 'react'
import './Scanner.css'
import QRCode from "react-qr-code";
import { Link } from 'react-router-dom';

const Scanner = () => {
  return (
    <div className='Scanner__Container'>
        <div className="imgBx">
            <img src={`https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} alt={`alt`} />
        </div>
        <div className="Scanner__Container-contentContainer">
            <div className="-contentContainer__contentBx">
                <div className="__contentBx-logo">
                    <img src="./assest/img/qr-code.png" alt="" />
                </div>
                <div>
                    <h1>Scan QR-Code</h1>
                    <h3>scan QR-Code to register your account.</h3>
                    <div className='qrCode'>
                        <Link to={'/register'}><QRCode value={`http://${window.location.host}/register`}/></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Scanner