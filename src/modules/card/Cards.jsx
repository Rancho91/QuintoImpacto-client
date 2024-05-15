import React from "react";
import "./styles.css";
import { Box, Container } from "@mui/material";
import { useTheme } from "@emotion/react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Popper from "@mui/material/Popper";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Cards(/*props*/) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Card
      className="card"
      aria-describedby={id}
      onClick={handleClick}
      sx={{
        maxWidth: 250,
        width: "152px",
        height: "248px",
        position: "relative",
        margin: 1.5,
        borderRadius: 2,
        overflow: "visible",
        zIndex: 1,
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ padding: "10px" }}>
        <Box
          sx={{
            color: "#4E169D",
            width: "60%",
            position: "absolute",
            top: "-7px",
            left: "60px",
            border: 1,
            borderColor: "#00A364",
            borderRadius: 0.5,
            backgroundColor: "white",
            boxShadow: 5,
            textAlign: "center",
          }}
        >
          <h4 style={{ fontFamily: theme.typography.fontFamily }}>
            Categoria{/*props.categoria*/}
          </h4>
        </Box>
        <CardMedia
          sx={{ borderRadius: 1, width: "136px", height: "136px" }}
          component="img"
          // height="128"
          // width='304'
          image="src/modules/card/Rectangle 28.png" /*props.img*/
          alt="Producto"
        />
        <Container>
          <Box
            sx={{
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            <h4 style={{ fontFamily: theme.typography.fontFamily }}>
              Titulo{/*props.titulo*/}
            </h4>
          </Box>
          <Box
            sx={{
              textAlign: "left",
            }}
          >
            <h5 style={{ fontFamily: theme.typography.fontFamily }}>
              Descripcion{/*props.descripcion*/}
            </h5>
          </Box>
          <div
            style={{
              display: "flex",
              marginTop: "15px",
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                color: "#4E169D",
                fontSize: "22px",
              }}
            />
            <Box>
              <h4 style={{ fontFamily: theme.typography.fontFamily }}>
                Locacion{/*props.locacion*/}
              </h4>
            </Box>
          </div>
        </Container>
      </CardContent>

      {/* POPPER */}
      <Popper
        sx={{ zIndex: 2 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="top-start"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [
                -(window.innerWidth / 2 - "auto"), // Horizontal
                -(window.innerHeight / 2 - "0"), // Vertical
              ],
            },
          },
        ]}
      >
        <Card
          aria-describedby={id}
          onClick={handleClick}
          elevation={3}
          sx={{
            width: "328px",
            height: "584",
            margin: 1.5,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#EAEAEA",
          }}
        >
          <div>
            <CloseIcon
              sx={{
                float: "right",
                padding: 1,
              }}
            />
          </div>
          <CardContent sx={{ padding: "10px" }}>
            <Box
              sx={{
                color: "#4E169D",
                width: "40%",
                float: "right",
                border: 1,
                borderColor: "#00A364",
                borderRadius: 0.5,
                backgroundColor: "white",
                boxShadow: 5,
                textAlign: "center",
              }}
            >
              <h4 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                Categoria{/*props.categoria*/}
              </h4>
            </Box>
            <CardMedia
              sx={{ borderTopLeftRadius: 1, width: "100%", height: "auto" }}
              component="img"
              image="src/modules/card/Rectangle 28.png"
              alt="Producto"
            />
            <Container>
              <Box
                sx={{
                  textAlign: "left",
                  marginTop: "10px",
                }}
              >
                <h2 style={{ fontFamily: theme.typography.fontFamily, fontSize: "18px" }}>
                  Titulo{/*props.titulo*/}
                </h2>
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  color: "#4E169D",
                }}
              >
                <h3 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                  Descripcion{/*props.descripcion*/}
                </h3>
              </Box>
              <div style={{ display: "flex", marginTop: "15px" }}>
                <LocationOnOutlinedIcon sx={{ color: "#4E169D", fontSize: "22px" }} />
                <Box>
                  <h2 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                    Locacion{/*props.locacion*/}
                  </h2>
                </Box>
              </div>
              <Box
                sx={{
                  textAlign: "left",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontFamily: theme.typography.fontFamily }}>
                  Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva,
                  magistral y con personalidad. Nuestro objetivo es hacer productos que
                  enamoren, que cuiden al planeta, con principios activos que dejen el pelo
                  sano y la piel bella.{/*props.body*/}
                </p>
              </Box>

              {/* footerCard */}
              <Box>
                <h2 style={{ fontFamily: theme.typography.fontFamily, fontSize: "16px" }}>
                  Contactanos
                </h2>
              </Box>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <WhatsAppIcon sx={{ color: "#4E169D", fontSize: "32px" }} />
                  <h4 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                    WhatsApp
                  </h4>
                </div>
                <div style={{ textAlign: "center" }}>
                  <InstagramIcon sx={{ color: "#4E169D", fontSize: "32px" }} />
                  <h4 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                    Instagram
                  </h4>
                </div>
                <div style={{ textAlign: "center" }}>
                  <FacebookIcon sx={{ color: "#4E169D", fontSize: "32px" }} />
                  <h4 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                    Facebook
                  </h4>
                </div>
                <div style={{ textAlign: "center" }}>
                  <EmailOutlinedIcon sx={{ color: "#4E169D", fontSize: "32px" }} />
                  <h4 style={{ fontFamily: theme.typography.fontFamily, fontSize: "13px" }}>
                    Mail
                  </h4>
                </div>
              </div>
              {/* footerCard */}
            </Container>
          </CardContent>
        </Card>
      </Popper>
      {/* POPPER */}
    </Card>
  );
}
