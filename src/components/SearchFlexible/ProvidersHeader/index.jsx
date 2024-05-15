import React from 'react'
import '../../../assets/styles/Inicio/inicio.css'
import { Typography, useTheme } from '@mui/material'

const ProvidersHeader = () => {
    const theme = useTheme();
    return (
        <section className="home-title-container">
            <Typography
                variant="titulos"
                className='home-title'
                sx={{ fontSize: "18px", color: theme.palette.blanco.main, mb: "8px" }}
            >
                PROVEEDORES
            </Typography>
            <Typography
                variant="subtitulos"
                className="home-subtitles"
                sx={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: theme.palette.blanco.main,
                    mb: "16px",
                    width: "240px",
                }}
            >
                Directorio ECO
            </Typography>
            <Typography
                variant="subtitulos"
                className="home-paragraph"
                sx={{
                    fontSize: "24px",
                    fontWeight: 400,
                    color: theme.palette.blanco.main,
                    width: "240px",
                }}
            >
                Descubrí a quienes comparten tu pasión por el impacto positivo y la sostenibilidad
            </Typography>
        </section>
    )
}

export default ProvidersHeader