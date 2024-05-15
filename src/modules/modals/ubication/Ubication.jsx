import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import useVisitorLocation from "../../../utils/services/hooks/useLocation";

const UbicationModal = () => {
  const {
    setPermission,
    denyPermission,
    handleShowModal,
    showModal,
    saveCoords,
  } = useVisitorLocation();

  const handleSaveLocation = async () => {
    if ("geolocation" in navigator) {
      try {
        setPermission();
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const latitudeAsString = latitude.toString();
        const longitudeAsString = longitude.toString();
        saveCoords(latitudeAsString, longitudeAsString);
        handleShowModal();
      } catch (error) {
        if (error.code === error.PERMISSION_DENIED) {
          console.error("El usuario ha denegado el permiso de geolocalización.");
        } else {
          console.error("Error al obtener las coordenadas:", error.message);
        }
      }
    } else {
      console.error("El navegador no soporta geolocalización");
    }
  };

  const handleCancel = () => {
    console.log("El usuario decidió no solicitar la ubicación");
    denyPermission();
    handleShowModal();
  };

  return (
    <Dialog open={showModal}>
      <DialogTitle>Activá tu ubicación</DialogTitle>
      <DialogActions>
        <Button onClick={handleSaveLocation} sx={{ color: "#4E169D", marginRight: "15px" }}>
          Aceptar
        </Button>
        <Button onClick={handleCancel} sx={{ marginRight: "4px" }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UbicationModal;
