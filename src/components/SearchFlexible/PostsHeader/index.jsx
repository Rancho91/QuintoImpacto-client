import React from 'react'
import '../../../assets/styles/Inicio/inicio.css'
import { Typography, useTheme } from '@mui/material'

const PostsHeader = () => {
    const theme = useTheme()
    return (
        <section className="home-title-container">
            <Typography
                variant="titulos"
                className='home-title'
                sx={{ fontSize: "18px", color: theme.palette.blanco.main, mb: "8px" }}
            >
                PUBLICACIONES
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
                Historias de impacto
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
                Encontrá inspiración y explorá las noticias y tendencias que están dando forma a un mundo más verde
            </Typography>
        </section>
    )
}

export default PostsHeader