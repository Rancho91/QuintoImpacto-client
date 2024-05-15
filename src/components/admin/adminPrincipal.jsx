import { Typography } from "@mui/material";
import "./adminPrincipal.css";
import useGetAll from "../../utils/services/hooks/useGetAll";
import ProviderCategory from "./providerCategory/providerCategory";
import VisualizacionPublicacion from "./visualizacionPublicacion/visualizacionPublicacion";
import useUser from "../../utils/services/hooks/useUser";
import { useEffect, useState } from "react";

export default function AdminPrincipal() {
  const [load, setLoad] = useState(false)
  const { token } = useUser();

  useEffect(() => {
    setLoad(!load)
  }, [token])


  const { data, loading, error } = useGetAll({
    url: "statistics/quantitySupplierByStatus",
    needsAuth: true,
    token: token,
  });
  console.log(data)



  return (
    <div className="adminContainer">
      <div className="adminBox">
        <Typography variant="titulos">Dashboard Administrador</Typography>
        <Typography variant="subtitulos">Estadisticas mensuales</Typography>
        <div className="newProfiles">
          <Typography variant="subtitulos">Servicios y productos creados:</Typography>
          <Typography variant="subtitulos">{data?.data?.newSuppliers || 0} </Typography>
        </div>
        <div className="boxCalculosContainer">
          <div className="boxcalculos box colorAceptado">
            <p className="title">Aprobados</p>
            <p className="count">{data?.data?.accepted | 0}</p>
          </div>
          <div className="boxcalculos box colorRevicion">
            <p className="title">En revisión</p>
            <p className="count">{data?.data?.review | 0}</p>
          </div>
          <div className="boxcalculos box colorDenegado">
            <p className="title">Denegados</p>
            <p className="count">{data?.data?.denied | "Cargando..."}</p>
          </div>
        </div>
        <ProviderCategory />
        <VisualizacionPublicacion />
      </div>
    </div>
  );
}
