import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./alertModal.module.css";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';//closeFuncion debe setear en folse el boolOpen del componente padre, es para controlar el estado de open que ambos los controla el componente padre.
export default function AlertModal(props) {
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
        sx={{backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}
      >
        <Box className={styles.box}>
          <div className={styles.containerIcon}>
            <div className={styles.borderIcon}>
              <PriorityHighIcon sx={{ fontSize: 40, color: "#B86B11" }}></PriorityHighIcon>
            </div>
          </div>

          <div className={styles.parrafoContainer}>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "18px", mt: 2 ,  fontFamily: 'Nunito'   }}
              align="center" 
            >
              {parrafo}
            </Typography>
          </div>

         
          <div className={styles.containerButtonAceptar}>
            <button onClick={closeFuncion} className={styles.buttonAceptar}>
              <Typography sx={{ fontSize: "14px", mt: 2 ,  fontFamily: 'Nunito', color:'#4E169D'}}>Aceptar</Typography>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
