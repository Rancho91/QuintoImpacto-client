import React, { useEffect, useState } from "react";

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = () => {
    if (!window.matchMedia) return;
    const isMobileDevice =
      window.matchMedia("(pointer:coarse)").matches && window.innerWidth <= 768;
    setIsMobile(isMobileDevice);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    isMobile,
  };
};

export default useDevice;
