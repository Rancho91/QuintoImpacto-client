import React, { useContext } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import google from '../../../assets/svg/google_icon.svg'
import { useNavigate } from 'react-router-dom'
import useUser from "../../../utils/services/hooks/useUser";


export default function GoogleButton() {
  const navigate = useNavigate()
  const { initializeUser, initializeToken } = useUser();

  const googleSuccess = async (res) => {
    const scope = res.scope
    const code = res.code
    try {
      const response = await axios.post('http://localhost:8080/login/oauth2/code/google', { code, scope }); 
      if (response) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userData', JSON.stringify(response.data))
        initializeUser(response.data)
        initializeToken(response.data.token)
        if (response.data.rol === "PROVEEDOR") {
          navigate('/profile')
        } else {
          navigate('/admin')
        }
      } else {
        console.log("Error al iniciar sesión.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Error al iniciar sesión. Intente de nuevo más tarde.')
  }


  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    onError: googleFailure,
    flow: 'auth-code',
  });

  return (
    <button onClick={() => login()}>
      <img src={google} alt="google" id='google-img' />
      <p>Continuá con Google</p>
    </button>
  )
}

