import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './QrCode.css'

const QrCode = () => {

    const qrcode = useSelector((state) => state.userQRReducer.userData.qrcode)
    console.log(qrcode);

  return (
    <>
        <div className='QrCode__Container'>
        <div className="imgBx">
            <img src={`https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} alt={`alt`} />
        </div>
        <div className="QrCode__Container-contentContainer">
            <div className="-contentContainer__contentBx">
                <div className="__contentBx-logo">
                    <img src="./assest/img/qr-code.png" alt="" />
                </div>
                <div>
                    <h1>Scan QR-Code</h1>
                    <h3>scan QR-Code to register your account.</h3>
                    <div className='qrCode'>
                        <img src={qrcode} alt="qrcode"/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default QrCode