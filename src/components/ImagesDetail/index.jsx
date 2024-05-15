/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Dialog, IconButton, MobileStepper, useTheme } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

const ImagesDetail = ({ images, open, onClose, activeImage }) => {
  const theme = useTheme();
  const [active, setActive] = useState(activeImage || 0);

  const steps = images?.length;

  const handleNext = () => {
    setActive((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setActive((prevState) => prevState - 1);
  };

  return (
    <div className="images-detail">
      <Dialog
        open={open}
        onClose={onClose}
        className="images-detail-dialog"
        id="images-detail-dialog"
        sx={{ margin: "0px", padding: "0px", width: "100vw", minHeight: "100%" }}
      >
        <div
          className="images-dialog-inner-container"
          style={{ backgroundColor: theme.palette.negro.main }}
        >
          <section className="images-detail-btn-container">
            <IconButton aria-label="close-detail" size="large" onClick={onClose}>
              <CloseIcon sx={{ color: theme.palette.blanco.main }} />
            </IconButton>
          </section>
          <section className="images-detail-stepper-container">
            <MobileStepper
              variant="text"
              steps={steps}
              position="static"
              activeStep={active}
              sx={{ color: theme.palette.blanco.main }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={active === steps - 1}
                  sx={{ color: theme.palette.blanco.main }}
                >
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={active === 0}
                  sx={{ color: theme.palette.blanco.main }}
                >
                  <KeyboardArrowLeft />
                </Button>
              }
            />
            <img
              className="images-detail-img"
              src={images[active]?.path}
              alt={images[active]?.name}
            />
          </section>
        </div>
      </Dialog>
    </div>
  );
};

export default ImagesDetail;
