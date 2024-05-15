import React, { useState } from "react";
import Inicio from "./modules/Inicio/Inicio";
import { Route, Routes } from "react-router-dom";
import Register from "./modules/Login/Register";
import SignIn from "./modules/Login/SingnIn";
import Nav from "./modules/Nav/Nav";
import { AuthProvider } from "./utils/context/AuthContext";
import PostsView from "./modules/PostsView";
import ProvidersHome from "./modules/Providers/ProvidersHome";
import ProvidersDetail from "./modules/Providers/ProvidersDetail";
import * as webAppRoutes from './constants/webAppRoutes'
import Chatbot from "./modules/Chatbot";
import { LocationContextProvider } from "./utils/context/LocationContext";

function App() {
  return (
    <AuthProvider>
      <LocationContextProvider>
        <Nav />
        <Chatbot />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Inicio />}></Route>

          {/* Ruta de registro */}
          <Route path="/register" element={<Register />} />

          {/* Ruta de proveedores (visitante) */}
          <Route path="/providers" element={<ProvidersHome />} />
          <Route path="/posts" element={<PostsView />} />
          <Route path="/providers/:id" element={<ProvidersDetail />} />

          {/* Ruta de proveedores (visitante) */}
          <Route path="login" element={<SignIn />} />

          {/* Rutas de usuario proveedor */}
          <Route path={webAppRoutes.PROVIDER_PROFILE.path} element={webAppRoutes.PROVIDER_PROFILE.element} />
          <Route path={webAppRoutes.CREATE_PRODUCT.path} element={webAppRoutes.CREATE_PRODUCT.element} />
          <Route path={webAppRoutes.UPDATE_PRODUCT.path} element={webAppRoutes.UPDATE_PRODUCT.element} />

          {/* Rutas de usuario admin */}
          <Route path={webAppRoutes.ADMIN_DASHBOARD.path} element={webAppRoutes.ADMIN_DASHBOARD.element} />
          <Route path={webAppRoutes.PROVIDERS_LIST.path} element={webAppRoutes.PROVIDERS_LIST.element} />
          <Route path={webAppRoutes.POSTS_LIST.path} element={webAppRoutes.POSTS_LIST.element} />
          <Route path={webAppRoutes.CREATE_POST.path} element={webAppRoutes.CREATE_POST.element} />
          <Route path={webAppRoutes.UPDATE_POST.path} element={webAppRoutes.UPDATE_POST.element} />

        </Routes>
      </LocationContextProvider>
    </AuthProvider>
  );
}

export default App;
