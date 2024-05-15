import React from 'react'
import logo from '../../../assets/svg/logo.svg'
import '../../../assets/styles/Login/logincard.css'
import GoogleButton from '../GoogleAuthButton/GoogleButton'

export default function LoginCard(props){
  return(
    <div className='login-card'>
      <h1>{props.title}</h1>
      <p>{props.topText}</p>
      <img src={logo} alt="logo" id='logo'/>
      <p>{props.bottomText}</p>
      <GoogleButton/>
    </div>
  )
}