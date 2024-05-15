import React from "react";
import LoginCard from "./LoginCard/LoginCard";
import "../../assets/styles/Login/login.css";

export default function SignIn() {
  return (
    <div id="signin">
      <div>
        <LoginCard
          title="Inicia Sesión"
          topText="Seguí disfrutando de ECOSistema"
          bottomText="Ingresá con tu cuenta de Gmail"
        />
      </div>
    </div>
  );
}
