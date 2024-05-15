import React, { useEffect, useState } from "react";
import "./styles.css";
import { useFormik } from "formik";
import { Typography, Button, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { schemaFormProviders } from "../../../utils/schemas/schemaFormProviders";
import useUser from "../../../utils/services/hooks/useUser";
import useGetAll from "../../../utils/services/hooks/useGetAll";
import IndexFile from "../../../components/cloudinary/IndexFile";
import ImagesPublicationList from "../../../components/admin/imagesPublication/imagesPublication";
import usePost from "../../../utils/services/hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import AlertSuccesErrorModal from "../../../components/modals/alertErrorSucces/alertErrorSuccesModal";
import useGetPulblication from "../../../utils/services/hooks/getPublication";
import useUpdate from "../../../utils/services/hooks/useUpdate";
import FormHelperText from '@mui/material/FormHelperText';

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(values);
};

const ProvidersForm = () => {
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
      country: 1,
      province: "",
      city: "",
      description: "",
    },
    validationSchema: schemaFormProviders,
    onSubmit,
  });
  const { token, user } = useUser();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  //estados modal
  const [modal, setModal] = useState(false);
  const [parrafoModal, setParrafoModal] = useState("");
  const [typeModal, setTypeModal] = useState("");

  const { id } = useParams();
  //carga de select
  const category = useGetAll({ url: "category" });
  const categoryData = category?.data?.data;

  const paises = useGetAll({ url: "pais/paises", token, needsAuth: true });
  const paisesData = paises?.data?.data;
  const provincias = useGetAll({
    url: `provincias/provinciasByIdPais/${values.country}`,
    token,
    needsAuth: true,
  });
  const provinciasData = provincias?.data?.data;
  //logica de manejo de imagenes
  const handlerLoadImage = (text, name) => {
    if (images.length >= 3) {
      return;
    }
    if (images.some((img) => img.name === name)) {
      return;
    }
    setImages([
      ...images,
      {
        isBase64: true,
        path: text,
        name: name,
      },
    ]);
  };

  const handleDeleteImage = (index) => {
    console.log(index);
    const newArray = images.filter((img) => img.name != index);
    setImages(newArray);
  };

  const handleEditImage = (text, name, newName) => {
    console.log(name, newName);
    const newArrImages = images.map((img) => {
      if (img && img.name === name) {
        img.isBase64 = true;
        img.path = text;
        img.name = newName;
      }
      return img;
    });

    setImages(newArrImages);
    return;
  };

  //submit
  const handlerSubmit = async (event) => {
    event.preventDefault();
    handleSubmit();
    if (images.length === 0) {
      setParrafoModal("El servicio/producto debe tener al menos 1 imagen");
      setTypeModal("error");
      setModal(true);
      return;
    }
    try {
      if (!id) {
        await usePost({
          url: "supplier/create",
          body: { ...values, images: images, user: user.id },
          token,
        });
      } else {
        await useUpdate({
          url: `supplier/update`,
          body: { ...values, images: images },
          token,
        });
      }
      setParrafoModal("Servicio/producto creado con éxito");
      setTypeModal("succes");
      setModal(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.status == 404) {
        setParrafoModal(error?.response?.data?.errorMessage);
        setTypeModal("error");
        setModal(true);
        return;
      }

      setParrafoModal("Lo sentimos, el servicio/producto no pudo ser creada.");
      setTypeModal("error");
      setModal(true);
    }
  };
  //manejo del modal
  const handlerCloseModal = () => {
    console.log(values)
    setModal(false);
    setParrafoModal("");
    // setTypeModal("");
    if (typeModal === 'succes') {
      navigate('/profile')
    }
  };

  //carga de datos proveedor por id
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!id)return
        const { data } = await useGetPulblication({
          url: `supplier/getById/${id}`,
          token,
        });
        console.log("data", data);

        setValues({
          id: data.data.id,
          name: data.data.name,
          shortDescription: data.data.shortDescription || "",
          category: data.data.category.id || "",
          email: data?.data?.email || "",
          phoneNumber: data.data.phoneNumber || "",
          instagram: data.data.instagram || "",
          facebook: data.data.facebook || "",
          country: data?.data?.country?.id || "",
          province: data?.data?.province?.id || "",
          city: data?.data?.city || "",
          description: data?.data?.description || "",
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
  return (
    <div className="providers-form-screen">
      <section className="providers-form-title">
        <Typography variant="titulos" sx={{ minWidth: "328px" }}>
          Carga de Producto/Servicio
        </Typography>
        <Typography variant="subtitulos" sx={{ mt: 4 }}>
          Completá el formulario para subir tu Producto/Servicio
        </Typography>
      </section>

      <section className="providers-form-main-container">
        <form
          className="providers-form-inputBox"
          autoComplete="off"
          onSubmit={handlerSubmit}
        >
          <TextField
            className={
              errors.name && touched.name
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            name="name"
            label="Nombre de la Organización"
            helperText={
              errors.name && touched.name
                ? errors.name
                : "Se visualizará en el título de la publicación"
            }
          />
          <TextField
            className={
              errors.shortDescription && touched.shortDescription
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.shortDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.shortDescription && touched.shortDescription}
            name="shortDescription"
            label="Breve descripción del Producto/Servicio"
            helperText={
              errors.shortDescription && touched.shortDescription
                ? errors.shortDescription
                :`Se visualizará en el subtítulo de la publicación ${values.shortDescription.length}/50`
            }
          />
          <TextField
            name="category"
            className="custom-textfield"
            label="Categoría"
            select
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.category && touched.category
                ? errors.category
                : "Seleccioná la categoría de tu Producto/Servicio"
            }
          >
            {categoryData?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={
              errors.email && touched.email
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            name="email"
            label="Correo electrónico"
            helperText={
              errors.email && touched.email
                ? errors.email
                : "El mismo con el que te registraste o uno diferente"
            }
          />
          <TextField
            className={
              errors.phoneNumber && touched.phoneNumber
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneNumber && touched.phoneNumber}
            name="phoneNumber"
            label="Teléfono o Whatsapp"
            helperText={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : "Con el siguiente formato +54 9 261 002 002"
            }
          />
          <TextField
            className={
              errors.instagram && touched.instagram
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.instagram}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.instagram && touched.instagram}
            name="instagram"
            label="Instagram"
            helperText={
              errors.instagram && touched.instagram
                ? errors.instagram
                : "Podés pegar el link de tu perfil"
            }
          />
          <TextField
            className={
              errors.facebook && touched.facebook
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.facebook}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.facebook && touched.facebook}
            name="facebook"
            label="Facebook"
            helperText={
              errors.facebook && touched.facebook
                ? errors.facebook
                : "Podés pegar el link de tu perfil"
            }
          />
          <TextField
            name="country"
            className="custom-textfield"
            label="País"
            select
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.country && touched.country
                ? errors.country
                : "Seleccioná un país de la lista"
            }
          >
            {paisesData?.map((pais) => (
              <MenuItem key={pais.id} value={pais.id}>
                {pais.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="province"
            className="custom-textfield"
            label="Provincia/Estado"
            select
            value={values.province}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.province && touched.province
                ? errors.province
                : "Seleccioná una provincia/estado de la lista"
            }
          >
            {provinciasData?.map((provincia) => (
              <MenuItem key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={
              errors.city && touched.city
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.city && touched.city}
            name="city"
            label="Ciudad"
            helperText={
              errors.city && touched.city
                ? errors.city
                : "Sin abreviaturas, nombre completo"
            }
          />
          <TextField
            className={
              errors.description && touched.description
                ? "custom-textfield input-error"
                : "custom-textfield"
            }
            required
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description && touched.description}
            name="description"
            label="Descripción del Producto/Servicio"
            helperText={
              errors.description && touched.description
                ? errors.description
                : <FormHelperText style={{display:'flex', justifyContent:'space-between'}}>
                  <span>Máximo 300 caracteres</span>
                  <span>{values.description.length}/300</span>
                </FormHelperText>
            }
            multiline
            rows={5}
          />
          <div style={{ marginTop: '100px', minWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {images.length >= 3 ? null : (
              <IndexFile functionLoad={handlerLoadImage} type={"input"} />
            )}

            <div
              style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: 'center', marginTop: '10px' }}
            >
              <ImagesPublicationList
                listImages={images}
                handlerDeleteImage={handleDeleteImage}
                handleEditImage={handleEditImage}
              />
            </div>
          </div>
          <Button
            sx={{ marginTop: 5, marginBottom: 5 }}
            className={
              Object.keys(errors).length == 0 &&
                Object.entries(values).some(([key, value]) => value) &&
                images.length != 0
                ? "ok-button"
                : ""
            }
            variant="form"
            type="submit"
            disabled={isSubmitting}
          >
            Cargar Producto/Servicio
          </Button>
        </form>

        <AlertSuccesErrorModal
          boolOpen={modal}
          parrafo={parrafoModal}
          closeFuncion={handlerCloseModal}
          type={typeModal}
          route={"/profile"}
        />
      </section>
    </div>
  );
};

export default ProvidersForm;
