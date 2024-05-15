import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./errorModal.module.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

//closeFuncion debe setear en folse el boolOpen del componente padre, es para controlar el estado de open que ambos los controla el componente padre.
export default function ErrorModal(props) {
  const { boolOpen, parrafo, closeFuncion } = props;
  const [open, setOpen] = useState(boolOpen);

  useEffect(() => {
    setOpen(boolOpen);
  }, [boolOpen]);

  return (
    <div>
      <Modal
        open={open}
        onClose={closeFuncion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <div className={styles.containerCheckIcon}>
            <div className={styles.borderCheckIcon}>
              <ClearRoundedIcon
                sx={{ fontSize: 40, color: "#BC1111" }}
              ></ClearRoundedIcon>
            </div>
          </div>

          <div className={styles.parrafoContainer}>
            <Typography
              id="modal-modal-description"
              align="center"
              sx={{ fontSize: "18px", mt: 2, fontFamily: "Nunito" }}
            >
              {parrafo}
            </Typography>
          </div>
          <div className={styles.SubparrafoContainer}>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "14px", mt: 2, fontFamily: "Nunito" }}
              align="start"
            >
              Por favor, volvé a intentarlo.
            </Typography>
          </div>
          <div className={styles.containerButton}>
            <button
              onClick={closeFuncion}
              className={styles.buttonCancelarIntentar}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  mt: 2,
                  fontFamily: "Nunito",
                  color: "#4E169D",
                }}
              >
                cancelar
              </Typography>
            </button>
            <button className={styles.buttonCancelarIntentar}>
              <Typography
                sx={{
                  fontSize: "14px",
                  mt: 2,
                  fontFamily: "Nunito",
                  color: "#4E169D",
                }}
              >
                Intentar nuevamente
              </Typography>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
