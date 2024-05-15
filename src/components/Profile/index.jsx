import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useUser from '../../utils/services/hooks/useUser'
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import perfilImage from '../../assets/svg/perfil.svg'
import './profile.css'
import { useNavigate } from 'react-router-dom';
import useVisitorLocation from '../../utils/services/hooks/useLocation';

const ProviderStyledMenu = styled((props) => (
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
    borderTopLeftRadius: 'unset',
    borderTopRightRadius: 'unset',
    marginTop: theme.spacing(1),
    minWidth: 200,
    padding: '7px 23px 0 23px',
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}))

const AdminStyledMenu = styled((props) => (
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
    backgroundColor: '#D2D2D2',
    borderTopLeftRadius: 'unset',
    borderTopRightRadius: 'unset',
    marginTop: theme.spacing(1),
    minWidth: 100,
    padding: '2px 10px 2px 12px',
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}))


export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, logout } = useUser();
  const { clearLocation } = useVisitorLocation();
  const navigate = useNavigate()

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const googleSignOut = async () => {
    try {
      if (user) {
        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('token')
        navigate('/login')
        logout();
        clearLocation();
      }
    } catch (error) {
      console.log(error);
      console.log('Error al cerrar sesión.')
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    return nameParts.map((part) => part.charAt(0)).join('').toUpperCase()
  }

  const initialName = getInitials(user?.name)
  const initialLastname = getInitials(user?.lastName)

  return (
    <div id="profile-menu">
      {user ?
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 42, height: 42, bgcolor: grey[900] }}>{initialName + initialLastname}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          {user && user.rol === "PROVEEDOR" ?
            <ProviderStyledMenu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div onClick={handleClose}>
                <div id="profile">
                  <img src={perfilImage} />
                  <div id="info">
                    {user && user.lastName && user.name &&
                      (<p id="name">{`${user.name}  ${user.lastName}`}</p>)}
                    {user && user.email &&
                      (<p>{user.email}</p>)}
                  </div>
                </div>
              </div>
              <div onClick={handleClose} id="item-mi-perfil">
                <a href="/profile">Mi perfil</a>
              </div>
              <div onClick={handleClose}>
                <span onClick={googleSignOut}>
                  Cerrar sesión
                </span>
              </div>
            </ProviderStyledMenu>
            :
            <AdminStyledMenu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div onClick={handleClose}>
                <span onClick={googleSignOut} id='logout'>
                  Cerrar sesión
                </span>
              </div>
            </AdminStyledMenu>
          }

        </React.Fragment>
        :
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <a href="/login" id='perfil-inactivo'>
                  <img src={perfilImage} alt="" id='img-perfil-inactivo' />
                  Ingresá
                </a>
              </IconButton>
            </Tooltip>
          </Box>
        </React.Fragment>
      }
    </div>
  );
}
