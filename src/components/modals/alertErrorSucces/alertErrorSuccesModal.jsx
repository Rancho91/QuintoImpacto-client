import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./alertErrorSuccesModal.module.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Link, Route } from "react-router-dom";

//type debe ser error, succes o alert, closeFuncion es una funcion del componente
//padre que abre o cierra el modal a traves de boolOpen, parrafo es el texto ue mostrara el modal
export default function AlertSuccesErrorModal({
  boolOpen,
  parrafo,
  closeFuncion,
  type,
  route,
}) {
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
          <div className={styles.containerIcon}>
            {type === "alert" ? (
              <div className={styles.borderIcon}>
                <PriorityHighIcon
                  sx={{ fontSize: 40, color: "#B86B11" }}
                ></PriorityHighIcon>
              </div>
            ) : null}

            {type === "succes" ? (
              <div className={styles.borderIconSucces}>
                <CheckIcon sx={{ fontSize: 40, color: "#1D9129" }}></CheckIcon>
              </div>
            ) : null}
            {type === "error" ? (
              <div className={styles.borderIconError}>
                <ClearRoundedIcon
                  sx={{ fontSize: 40, color: "#BC1111" }}
                ></ClearRoundedIcon>
              </div>
            ) : null}
          </div>
          <div style={{display:"flex", flexDirection:"column", padding:"16px", gap:"16px"}}>
            <div className={styles.parrafoContainer}>
              <Typography id="modal-modal-description" variant="subtitulos" sx={{textAlign:"center"}}>
                {parrafo}
              </Typography>
            </div>
            {type === "error" ? (
              <div className={styles.SubparrafoContainer}>
                <Typography
                  id="modal-modal-description"
                  sx={{ fontSize: "14px", fontFamily: "Nunito" }}
                  align="left"
                >
                  Por favor, volvé a intentarlo.
                </Typography>
              </div>
            ) : null}
          </div>

          {type === "succes" || type === "alert" ? (
            <div className={styles.containerButtonAceptar}>
              <Button
                variant="modal"
                onClick={closeFuncion}
                className={styles.buttonAceptar}
              >
                Aceptar
              </Button>
            </div>
          ) : null}
          {type === "error" ? (
            <div className={styles.containerButton}>
              <Button variant="modal" className={styles.buttonCancelarIntentar}>
                <Link to={route}>Cancelar</Link>
              </Button>
              <Button
                variant="modal"
                onClick={closeFuncion}
                className={styles.buttonCancelarIntentar}
              >
                Intentar nuevamente
              </Button>
            </div>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
