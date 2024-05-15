import React from 'react'
import '../../../assets/styles/Inicio/inicio.css'
import { Typography, useTheme } from '@mui/material'

const HomeHeader = () => {
    const theme = useTheme()
    return (
        <section className="home-title-container">
            <Typography
                variant="titulos"
                className='home-title'
                sx={{ fontSize: "18px", color: theme.palette.blanco.main, mb: "8px" }}
            >
                RED DE IMPACTO
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
                Conectamos proveedores y personas comprometidas con el impacto y el consumo consciente
            </Typography>
        </section>
    )
}

export default HomeHeader