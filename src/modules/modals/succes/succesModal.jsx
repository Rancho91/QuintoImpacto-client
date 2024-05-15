import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./succesModal.module.css";
import CheckIcon from "@mui/icons-material/Check";
//closeFuncion debe setear en folse el boolOpen del componente padre, es para controlar el estado de open que ambos los controla el componente padre.
export default function SuccesModal(props) {
  const { boolOpen, titulo, parrafo, closeFuncion } = props;
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
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <Box className={styles.box}>
          <div className={styles.containerCheckIcon}>
            <div className={styles.borderCheckIcon}>
              <CheckIcon sx={{ fontSize: 40, color: "#1D9129" }}></CheckIcon>
            </div>
          </div>

          <div className={styles.parrafoContainer}>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "18px", mt: 2, fontFamily: "Nunito", }}
              align="center"
            >
              {parrafo}
            </Typography>
          </div>

          <div className={styles.containerButtonAceptar}>
            <button onClick={closeFuncion} className={styles.buttonAceptar}>
              <Typography
                sx={{
                  fontSize: "14px",
                  mt: 2,
                  fontFamily: "Nunito",
                  color: "#4E169D",
                }}
              >
                Aceptar
              </Typography>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
