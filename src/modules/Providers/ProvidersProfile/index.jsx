import React, { useEffect, useState } from "react";
import "./styles.css";
import { Box, Button, Tab, Tabs, Tooltip, Typography, useTheme } from "@mui/material";
import ProductsCard from "../../../components/ProductsCard";
import { NoResultsCard, SearchResultCard } from "../../../components/SearchResultsCards";
import useUser from "../../../utils/services/hooks/useUser";
import useGetAll from "../../../utils/services/hooks/useGetAll";
import CustomTabPanel from "../../../components/TabPanel";
import { useNavigate } from "react-router-dom";

const allyProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

export const ProvidersProfile = () => {
  const theme = useTheme();
  const [providers, setProviders] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  const { user } = useUser();
  const [showMessage, setShowMessage] = useState(false)

  const { data } = useGetAll({
    url: `supplier/user/${user.id}`,
    needsAuth: true,
    token: user.token
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      setProviders(data?.data);
    }
  }, [data]);

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    navigate('/profile/product/create')
  }

  const handleTooltip = () => {
    setShowMessage((prevState) => !prevState)
  }

  return (
    <div className="providers-profile-screen">
      <section className="providers-profile-name-container">
        <Typography variant="titulos" sx={{ minWidth: "328px" }}>
          {`${user?.name} ${user?.lastName}`}
        </Typography>
      </section>

      <section className="providers-profile-main-container">
        <Tooltip open={showMessage} arrow onClose={handleTooltip} title="Ha alcanzado el límite de productos" sx={{ mt: 1 }} slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -15] } }] } }} leaveTouchDelay={2000}>
          <span onClick={handleTooltip}>
            <Button variant="purple" onClick={handleClick} disabled={providers?.length >= 3}>Cargar Producto/Servicio</Button>
          </span>
        </Tooltip>
        <Typography variant="subtitulos" sx={{ mt: 7 }}>
          Mis Productos/Servicios
        </Typography>

      </section>

      <section className="providers-profile-tabs-container">
        {providers?.length > 0 ? (
          <>
            <Box className="providers-profile-tabs">
              <Tabs
                className="providers-profile-tabs-nav"
                value={value}
                onChange={handleChange}
                aria-label="providers-profile-tabs"
                variant="fullWidth"
              >
                {providers?.map((provider, index) => (
                  <Tab
                    key={provider?.id}
                    className="providers-profile-tab"
                    label={provider?.name}
                    {...allyProps(index)}
                    sx={{
                      color: theme.palette.violeta.main,
                      fontFamily: theme.typography.fontFamily,
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            {providers?.map((provider, index) => (
              <CustomTabPanel
                value={value}
                index={index}
                key={provider.id}
                className="providers-tabpanel"
              >
                <>
                  <section>
                    <div className="providers-profile-products-container">
                      <ProductsCard status={provider.status} provider={provider} />
                    </div>
                    {provider?.status !== "DENEGADO" && (
                      <div className="providers-profile-demo">
                        <Typography
                          variant="subtitulos"
                          sx={{
                            fontWeight: 400,
                            fontSize: "20px",
                            textAlign: "center",
                            margin: "0 16px 16px",
                          }}
                        >
                          {provider.status === "ACEPTADO"
                            ? "Asi se ve tu Producto/Servicio en el Directorio"
                            : "Asi se vería tu Producto/Servicio en el Directorio"}
                        </Typography>
                        <SearchResultCard supplier={provider} />
                      </div>
                    )}
                  </section>
                </>
              </CustomTabPanel>
            ))}
          </>
        ) : (
          <NoResultsCard title={'Todavía no hay productos o servicios'} subtitle={'Cuando los crees se visualizarán aquí'} />
        )}
      </section>
    </div>
  );
};

export default ProvidersProfile;
