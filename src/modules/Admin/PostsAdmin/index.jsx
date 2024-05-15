import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import './index.css'
import { NavLink } from "react-router-dom";
import PostsCard from '../../../components/PostsCard'
import {useNavigate} from 'react-router-dom'

const OptionsStyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      backgroundColor: 'white',
      borderTopLeftRadius : 'unset',
      borderTopRightRadius : 'unset',
      marginTop: theme.spacing(1),
      minWidth: 100,
      color: '#22222',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
  }))
  
export default function PostsAdmin(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const post = {
      title: '¿Qué es el Upcycling? ',
      fechaCreacion: '2024-04-09',
      description: 'El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad. Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas. El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse. El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente. En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!',
    };

    const hardImages = [
        "https://res.cloudinary.com/dxatwbzff/image/upload/v1710415070/Quinto/1c27a72869b176f8ac7bc5f75f460594_fddnpc.jpg",
        "https://res.cloudinary.com/dpbuvii9v/image/upload/v1712264504/c1498999f8addebf3e800720a2445865_uzmafz.jpg",
        "https://res.cloudinary.com/dpbuvii9v/image/upload/v1712264503/ca3817b7e452c7de4602ccf498f7afd1_xfkd2x.png",
    ];
    return(
        <div id="posts_admin">
            <h2>Publicaciones</h2>
            <button className='btn_create'><NavLink to="loadPublication">Crear publicación</NavLink></button>
            <h3>Publicaciones cargadas</h3>
            
            {/* La idea es que se renderice por Box, y dentro del Box estaría el post y el boton de opciones */}
            <Box sx={{position: 'relative', marginTop: '25px'}}>
              {/* Render del Post */}
              <PostsCard 
                post={post}
                images={hardImages}
                />
              {/* Boton de opciones */}
              <Box sx={{position:'absolute', top:'23px', right: '23px'}}>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, color: 'black', "&:hover": { color: "white", backgroundColor: '#4E169D' }, }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <MoreVertIcon/>
                  </IconButton>
                <OptionsStyledMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                > 
                  {/* Botones de editar y ocultar */}
                  <MenuItem onClick={()=> navigate('/admin/publications/editPublication')}>Editar</MenuItem>
                  <MenuItem>Ocultar</MenuItem>
                </OptionsStyledMenu>
              </Box>
            </Box>
            
        </div>
    )
}