import { useContext, useState } from "react";
import LocationContext from "../../../context/LocationContext";

const useVisitorLocation = () => {
  const { allowsLocation, setAllowsLocation, location, setLocation } =
    useContext(LocationContext);
  const [showModal, setShowModal] = useState(true);

  const setPermission = () => {
    window.localStorage.setItem("allowsLocation", true);
    setAllowsLocation(true);
  };

  const denyPermission = () => {
    window.localStorage.removeItem("allowsLocation");
  };

  const saveCoords = (lat, lng) => {
    window.localStorage.setItem("location", JSON.stringify({ latitude: lat, longitude: lng }));
    setLocation({
      latitude: lat,
      longitude: lng,
    });
  };

  const handleShowModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const clearLocation = () => {
    window.localStorage.removeItem('allowsLocation')
    window.localStorage.removeItem('location')
  }

  return {
    allowsLocation,
    setPermission,
    denyPermission,
    setLocation,
    saveCoords,
    location,
    showModal,
    handleShowModal,
    clearLocation
  };
};

export default useVisitorLocation;
