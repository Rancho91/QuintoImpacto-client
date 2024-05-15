import "./adminNewPublication.css";
import { useEffect, useState } from "react";
import IndexFile from "../../../components/cloudinary/IndexFile";
import ImagesPublicationList from "../../../components/admin/imagesPublication/imagesPublication";
import usePost from "../../../utils/services/hooks/usePost";
import AlertSuccesErrorModal from "../../../components/modals/alertErrorSucces/alertErrorSuccesModal";
import useUser from "../../../utils/services/hooks/useUser";
import useGetPulblication from "../../../utils/services/hooks/getPublication";
import { useLocation, useParams } from "react-router-dom";
import { Typography, Button, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { schemaFormPublication } from "../../../utils/schemas/schemaFormPublication";
import { useNavigate } from 'react-router-dom';

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(values);
};

export default function NewPublication() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schemaFormPublication,
    onSubmit,
  });

  const { id } = useParams();
  const [images, setImages] = useState([]);

  const [modal, setModal] = useState(false);
  const [parrafoModal, setParrafoModal] = useState("");
  const [typeModal, setTypeModal] = useState("");

  const { token, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("user", user);
console.log(values)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const { data } = await useGetPulblication({
          url: `publication/getById/${id}`,
          token,
        });
        console.log("data:", data);

        setValues({
          id: data.data.id,
          title: data.data.title,
          description: data?.data?.description,
        });
        const imagesData = [];
        data?.data?.imagePublicDtoList?.forEach((img) => {
          imagesData.push({ ...img, isBase64: false,name:img.path });
        });
        setImages(imagesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

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

  const handlerCloseModal = () => {
    if(typeModal=="succes") {navigate('/admin/posts'); }
    setModal(false);
    setParrafoModal("");
    setTypeModal("");

  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    if (images.length === 0) {
      setParrafoModal("La publicación debe tener al menos 1 imagen");
      setTypeModal("error");
      setModal(true);
      return;
    }
    try {
      if (!values.id) {
        await usePost({
          url: `publication/create/${user.id}`,
          body: { ...values, images: images },
          token,
        });
        setImages([]);
        setValues({
          id: "",
          title: "",
          description: "",
        })
      } else {
        await usePost({
          url: `publication/edit/${values.id}/1`,
          body: { ...values, images: images },
          token,
        });

      }
      setParrafoModal("Publicación creada con éxito");
      setTypeModal("succes");
      setModal(true);
    } catch (error) {
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

  const handleEditImage = (text, name, newName) => {
    console.log(name);
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
  console.log(images)
  return (
    <div className="container">
      <Typography variant="titulos">Carga de publicación</Typography>
      <Typography variant="subtitulos">
        Completá los datos para crear una nueva publicación
      </Typography>
      <form action="" className="form" onSubmit={handlerSubmit}>
        <TextField
          id="title"
          sx={{'& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px', 
            }
          }}}
          className={
            errors.title && touched.title
              ? "custom-textfield input-error"
              : "custom-textfield"
          }
          required
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title && touched.title}
          name="title"
          label="Título"
          helperText={
            errors.title && touched.title
              ? errors.title
              : "Se visualizará en el título de la publicación"
          }
        />
        <TextField
          id="description"
          sx={{ marginBottom: 22, '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px', 
            }
          } }}
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
          label="Ingresá el contenido de la publicación"
          helperText={
            errors.description && touched.description
              ? errors.description
              : <FormHelperText sx={{display:'flex', justifyContent:'space-between'}}>
                <p>Máximo 2000 carácteres</p>
                <p>{values.description.length}/2000</p>
              </FormHelperText> 
          }
          multiline
          rows={10}
        />
        <div className="imageContainer" style={{display: 'flex', alignItems:'center'}}>
          <ImagesPublicationList
            listImages={images}
            handlerDeleteImage={handleDeleteImage}
            handleEditImage={handleEditImage}
          />
        </div>
        {images.length >= 3 ? null : (
          <div className="containerIndexFile">
            <IndexFile functionLoad={handlerLoadImage} type={"input"} />
          </div>
        )}
        <button type="submit" style={{padding:'10px 50px'}}>Crear publicación</button>
      </form>

      <AlertSuccesErrorModal
        boolOpen={modal}
        parrafo={parrafoModal}
        closeFuncion={handlerCloseModal}
        type={typeModal}
        route={"/admin"}
      />
    </div>
  );
}
