/* eslint-disable react/prop-types */
import React from "react";
import "./styles.css";
import { Divider, IconButton, Typography, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AdminProviderCard = ({ provider, handleClick }) => {
  const theme = useTheme();
  const { name, shortDescription, status } = provider;

  return (
    <div
      className="admin-provider-card"
      style={{ backgroundColor: theme.palette.grises.light }}
    >
      <section className="provider-card-title-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <figure
            className="circle"
            style={{
              display: status === "REVISION_INICIAL" && "none",
              backgroundColor: theme.palette[status].main
            }}
          ></figure>
          <Typography
            variant="titulos"
            sx={{ fontSize: "18px", color: theme.palette.violeta.main }}
          >
            {name}
          </Typography>
        </div>
        <Divider
          sx={{ backgroundColor: theme.palette.verdes.main, width: "200px", mt: 0.5, mb: 0.5 }}
        />
        <Typography variant="subtitulos" sx={{ fontSize: "16px", fontWeight: 400 }}>
          {shortDescription}
        </Typography>
      </section>
      <section className="provider-card-button-container">
        <IconButton
          aria-label="see-more"
          className="provider-card-icon-button"
          onClick={() => handleClick(provider)}
        >
          <ChevronRightIcon sx={{ color: theme.palette.negro.main }} />
        </IconButton>
      </section>
    </div>
  );
};

export default AdminProviderCard;
