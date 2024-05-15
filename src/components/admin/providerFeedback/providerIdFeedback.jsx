/* eslint-disable react/prop-types */
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import "./providerIdFeedback.css";
import { useFormik } from "formik";
import useGetPulblication from "../../../utils/services/hooks/getPublication";
import { useEffect, useState } from "react";
import useUser from "../../../utils/services/hooks/useUser";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StatusProvider from "./component/status";
import FeedbackProvider from "./component/feedbackProvider";
import ImagesDetail from '../../ImagesDetail'

export default function ProviderFeedback({ id, providerStatus }) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      shortDescription: "",
      category: "",
      email: "",
      phoneNumber: "",
      instagram: "",
      facebook: "",
      country: "",
      province: "",
      city: "",
      description: "",
    },
  });
  const [images, setImages] = useState([]);
  const { token } = useUser();
  const [status, setStatus] = useState(() => providerStatus);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await useGetPulblication({
          url: `supplier/getById/${id}`,
          token,
        });

        setValues({
          id: data.data.id,
          name: data.data.name,
          shortDescription: data.data.shortDescription || "",
          category: data.data.category.category || "",
          email: data?.data?.email || "",
          phoneNumber: data.data.phoneNumber || "",
          instagram: data.data.instagram || "",
          facebook: data.data.facebook || "",
          country: data?.data?.country?.name || "",
          province: data?.data?.province?.nombre || "",
          city: data?.data?.city || "",
          description: data?.data?.description || "",
          feedback: data?.data?.feedback || "",
        });
        const imagesData = [];
        data?.data?.images?.forEach((img) => {
          imagesData.push({ ...img, isBase64: false });
        });
        setImages(imagesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    const name = event.currentTarget.getAttribute("name");
    if (!name) {
      setAnchorEl(null);
      return;
    }

    setStatus(name);
    setAnchorEl(null);
  };

  const handleEditBool = () => {
    setEdit(!edit);
  };

  const handleZoom = (index) => {
    setActiveImage(index)
    setShowZoom((prevState) => !prevState)
  }

  return (
    <div className="container" style={{ marginTop: "0px" }}>
      <StatusProvider status={status} />
      <div style={{ width: "80%", display: "flex", justifyContent: "end" }}>
        <div className="container-select">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ justifyContent: "space-between", width: "100%" }}
          >
            <span style={{ fontSize: "16px", fontWeight: 400, color: "#222222" }}>Estado</span>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "15ch",
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              style={{ display: "flex", flexDirection: "row" }}
              name="ACEPTADO"
            >
              {" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <circle cx="8" cy="8" r="8" fill="#1D9129" />
              </svg>
              Aprobado
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              style={{ display: "flex", flexDirection: "row" }}
              name="REQUIERE_CAMBIOS"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <circle cx="8" cy="8" r="8" fill="#B86B11" />
              </svg>
              En revisión
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              name="DENEGADO"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <circle cx="8" cy="8" r="8" fill="#BC1111" />
              </svg>
              Denegado
            </MenuItem>
          </Menu>
        </div>
      </div>

      <FeedbackProvider
        handlerChangeEdit={handleEditBool}
        editBool={edit}
        feedback={values.feedback}
        handleBlur={handleBlur}
        status={status}
        id={id}
      />

      <h1 className="title">{values.name} </h1>
      <h2 className="subtitle-category">{values.category} </h2>
      <TextField
        className={"custom-textfield"}
        required
        name="email"
        label="Correo electrónico"
        value={values.email}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="phoneNumber"
        label="Teléfono o Whatsapp"
        value={values.phoneNumber}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="instagram"
        label="Instragram"
        value={values.instagram}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="country"
        label="País"
        value={values.country}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="provincia"
        label="Provincia/Estado"
        value={values.province}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="city"
        label="Nombre de la Organización"
        value={values.city}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        name="shortDescription"
        label="Descripción corta del Producto/Servicio*"
        value={values.shortDescription}
        onBlur={handleBlur}
        readOnly
      />
      <TextField
        className={"custom-textfield"}
        required
        multiline
        rows={7}
        name="description"
        label="Descripción del Producto/Servicio*"
        value={values.description}
        onBlur={handleBlur}
        readOnly
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
          marginTop: "150px"
        }}
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              onClick={() => handleZoom(index)}
              style={{
                backgroundImage: `url(${image?.path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "25%",
                height: "100px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "start",
                gap: "5px",
              }}
            ></div>
          );
        })}
      </div>
      {
        showZoom && (
          <ImagesDetail images={images} open={showZoom} onClose={handleZoom} activeImage={activeImage} />
        )
      }
    </div>
  );
}
