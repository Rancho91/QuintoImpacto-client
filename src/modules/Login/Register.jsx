import React from "react";
import LoginCard from "./LoginCard/LoginCard";
import "../../assets/styles/Login/login.css";

export default function Register() {
  return (
    <div id="register">
      <div>
        <LoginCard
          title="Registrate"
          topText="Sumate a ECOSistema"
          bottomText="Registrate con tu cuenta de Gmail"
        />
      </div>
    </div>
  );
}
