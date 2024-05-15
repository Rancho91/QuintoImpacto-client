/* eslint-disable react/prop-types */
import Invitacion from "../../modules/invitacion/Invitacion";
import SuppliersCard from "../../components/SuppliersCard";
import "./styles.css";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function SuppliersSection({ suppliers }) {
  const theme = useTheme();

  return (
    <>
      <Invitacion />
      <div className="recommendations-section">
        <Typography
          className="recommendations-title"
          vairant="subtitulos"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "25px",
            color: theme.palette.negro.main,
          }}
        >
          Recomendaciones locales para vos
        </Typography>
        <Typography
          className="recommendations-subtitle"
          variant="subtitulos"
          sx={{
            mt: "5px",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "25px",
            color: theme.palette.negro.main,
          }}
        >
          Proveedores cerca tuyo
        </Typography>
      </div>
      <div
        className="suppliers-section-cards-background"
        style={{ backgroundColor: theme.palette.verdes.main }}
      >
        <section className="suppliers-cards-grid ">
          {suppliers?.slice(0, 4)?.map((supplier) => (
            <SuppliersCard key={supplier.id} supplier={supplier} />
          ))}
        </section>
      </div>
    </>
  );
}

export default SuppliersSection;
