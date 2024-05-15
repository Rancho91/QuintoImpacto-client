/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
const LocationContext = createContext();

const LocationContextProvider = ({ children }) => {
  const [allowsLocation, setAllowsLocation] = useState(() =>
    window.localStorage.getItem("allowsLocation")
  );
  const [location, setLocation] = useState(() =>
    JSON.parse(window.localStorage.getItem("location"))
  );

  const data = { allowsLocation, setAllowsLocation, location, setLocation };

  return <LocationContext.Provider value={data}>{children}</LocationContext.Provider>;
};

export { LocationContextProvider };

export default LocationContext;
