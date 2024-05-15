/* eslint-disable react/prop-types */
import React from "react";
import './styles.css'
import { Fab, useTheme } from "@mui/material";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const ActionButton = ({ handleOpen }) => {
    const theme = useTheme();

    const handleClick = (evt) => {
        handleOpen(evt)
    }

    return (
        <div className="chatbot-action-button-container">
            <Fab
                aria-label="chatbot-button"
                className='chatbot-action-button'
                onClick={handleClick}
                sx={{ color: theme.palette.violeta.main, }}
            >
                <ContactSupportIcon />
            </Fab>
        </div>
    );
};

export default ActionButton;
