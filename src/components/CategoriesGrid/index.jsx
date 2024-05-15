import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Button, useTheme } from "@mui/material";
import useGetAll from "../../utils/services/hooks/useGetAll";

const CategoriesGrid = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data } = useGetAll({
    url: "category",
    needsAuth: false,
  });

  return (
    <div className="categories-section">
      <h6>Red de Proveedores ECO</h6>
      <h3>Categorías</h3>
      <section className="categories-grid">
        {data?.data.slice(0, 8).map((category) => (
          <Button
            variant="categories"
            className="categories-grid-button"
            key={category.id}
            onClick={() => navigate(`/providers/${category?.id}`, { state: { category } })}
          >
            <div className="button-inner-wrapper">
              <section className="grid-item-icon-container">
                <img src={category?.image} alt={category?.category} />
              </section>
              <h6 className="grid-item-title" style={{ color: theme.palette.negro.main }}>
                {category?.category}
              </h6>
            </div>
          </Button>
        ))}
      </section>
      <section>
        <Button
          variant="purple"
          sx={{ padding: "10px 24px", mb: 2 }}
          onClick={() => navigate("/providers")}
        >
          Ver más categorías
        </Button>
      </section>
    </div>
  );
};

export default CategoriesGrid;
