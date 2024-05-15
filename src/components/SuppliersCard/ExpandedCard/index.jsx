/* eslint-disable react/prop-types */
import React from "react";
import { Dialog, useTheme, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./styles.css";
import Carrousel from "../../PostsCard/Carrousel";

// eslint-disable-next-line react/prop-types
const ExpandedCard = ({ open, handleClose, supplier }) => {
  const theme = useTheme();
console.log("supp desde expanded",supplier)
  return (
    <Dialog onClose={handleClose} open={open} className="expanded-card-dialog">
      <header className="expanded-card-header">
        <IconButton
          aria-label="close-card"
          onClick={handleClose}
          className="expanded-card-close-button"
        >
          <CloseIcon />
        </IconButton>
      </header>

      <section className="expanded-card-inner-wrapper">
        <div className="category-img-wrapper">
          <div className="expanded-card-category-container">
            <Typography
              className="expanded-card-category"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: "13px",
                fontWeight: 400,
                color: theme.palette.violeta.main,
              }}
            >
              {supplier?.category?.category}
            </Typography>
          </div>
          <Carrousel className="expanded-card-img" images={supplier?.images} alt="Producto" />
        </div>

        <div className="expanded-card-data-container">
          <Typography variant="boxAdmin" sx={{ lineHeight: "25px" }}>
            {supplier?.name}
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: theme.palette.violeta.main,
            }}
          >
            {supplier?.shortDescription}
          </Typography>
          <section className="expanded-card-location-container">
            <div className="location-icon-container">
              <LocationOnOutlinedIcon
                sx={{ color: theme.palette.violeta.main, width: "20px", height: "20px" }}
              />
            </div>
            <Typography
              variant="body1"
              className="expanded-card-location"
              sx={{
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              {`${supplier?.city}, ${supplier?.province?.nombre}, ${supplier?.country?.name}`}
            </Typography>
          </section>
        </div>
      </section>

      <section className="expanded-card-desc-container">
        <div className="expanded-card-description">
          <Typography
            variant="body1"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: "16px",
              fontWeight: 400,
              textAlign: "center",
              lineHeight: "20px",
              padding: 0,
            }}
          >
            {supplier?.description}
          </Typography>
        </div>
        <div className="expanded-card-contact-container">
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "25px",
              padding: 0,
            }}
          >
            Contactanos
          </Typography>
          <div className="social-media-icons-container">
            <figure className="social-media">
              <a
                href={`https://api.whatsapp.com/send?phone=+54${supplier?.phoneNumber}`}
                target="_blank"
                rel="noreferrer"
                className="social-media-icon-container"
              >
                <WhatsAppIcon className="social-media-icon" />
              </a>
              <figcaption className="social-media-title">Whatsapp</figcaption>
            </figure>
            <figure className="social-media">
              <a
                href={supplier?.instagram}
                target="_blank"
                rel="noreferrer"
                className="social-media-icon-container"
              >
                <InstagramIcon className="social-media-icon" />
              </a>
              <figcaption className="social-media-title">Instagram</figcaption>
            </figure>
            <figure className="social-media">
              <a
                href={supplier?.facebook}
                target="_blank"
                rel="noreferrer"
                className="social-media-icon-container"
              >
                <FacebookIcon className="social-media-icon" />
              </a>
              <figcaption className="social-media-title">Facebook</figcaption>
            </figure>
            <figure className="social-media">
              <a
                href={`mailto:${supplier?.email}`}
                target="_blank"
                rel="noreferrer"
                className="social-media-icon-container"
              >
                <EmailOutlinedIcon className="social-media-icon" />
              </a>
              <figcaption className="social-media-title">Mail</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </Dialog>
  );
};

export default ExpandedCard;
