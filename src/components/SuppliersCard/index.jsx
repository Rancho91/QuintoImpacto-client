/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ExpandedCard from "./ExpandedCard";
import "./styles.css";

export default function SuppliersCard({ supplier }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div className='card-container'>
      <div className='card-category-container' style={{ border: `1px solid ${theme.palette.verdes.main}`, backgroundColor: theme.palette.blanco.main }}>
        <Typography variant='subtitulos' sx={{ fontWeight: 400, fontSize: "13px", lineHeight: '18px' }}>
          {supplier?.category?.category}
        </Typography>
      </div>
      <Card
        className="card"
        onClick={handleOpen}
        sx={{ backgroundColor: theme.palette.blanco.main }}
      >
        <section className="card-content">
          <CardMedia className='card-content-img' component={'img'} image={supplier?.images[0]?.path} alt='Producto' />
          <div className='card-content-text-container'>
            <div className="supplier-card-data-container">
              <Typography variant='subtitulos' className='supplier-name' sx={{ fontWeight: 500, fontSize: "16px", lineHeight: '25px', color: theme.palette.negro.main, maxWidth: '100%' }} >
                {supplier?.name}
              </Typography>
              <Typography variant='subtitulos' className='supplier-short-description' sx={{ fontWeight: 400, fontSize: "13px", lineHeight: '18px', color: theme.palette.negro.main, maxWidth: '100%' }} >
                {supplier?.shortDescription}
              </Typography>
            </div>
            <div className="supplier-card-location-container">
              <LocationOnOutlinedIcon
                sx={{
                  color: "#4E169D",
                  fontSize: "24px",
                  mr: '4px'
                }}
              />
              <Typography variant='subtitulos' sx={{ fontWeight: 400, fontSize: "13px", lineHeight: "20px", color: theme.palette.negro.main }}>
                {supplier?.city}
              </Typography>
            </div>
          </div>
        </section>
        {open && <ExpandedCard handleClose={handleClose} open={open} supplier={supplier} />}
      </Card>
    </div>
  );
}
