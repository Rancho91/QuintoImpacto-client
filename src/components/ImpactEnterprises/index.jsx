import { Typography } from "@mui/material";
import "./styles.css";

const ImpactEnterprises = () => {
  return (
    <section className="impact-enterprise-section">
      <Typography
        variant="titulos"
        sx={{ fontWeight: 700, fontSize: "22px" }}
        className="impact-enterprise-title"
      >
        ¿Qué son las empresas de impacto?
      </Typography>
      <p className="impact-enterprise-desc">
        Son organizaciones con un compromiso fundamental con la generación de un impacto
        positivo en la sociedad y el medio ambiente como parte integral de su modelo de
        negocio.
      </p>
    </section>
  );
};

export default ImpactEnterprises;
