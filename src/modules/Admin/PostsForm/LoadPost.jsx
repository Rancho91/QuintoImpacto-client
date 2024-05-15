import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import uploadImg from '../../../assets/svg/upload_img.svg';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import schemaAdminPost from '../../../utils/schemas/schemaAdminPost';
import {useNavigate} from 'react-router-dom'
import './index.css';

const StyledField = styled(TextField)({
  marginTop: '20px',
  '& label.Mui-focused': {
    color: '#4E169D',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#222222',
      borderWidth: 1, // borde normal
    },
    '&.Mui-focused fieldset': {
      borderWidth: 1, // borde en focus
    },
  },
});


export default function LoadPost() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  
  return (
    <div id="load_post">
      <h2>Carga de publicación</h2>
      <h3>Completa los datos para crear una nueva publicación</h3>
      <Formik
        initialValues={{
          title: '',
          content: '',
          images: [],
        }}
        validationSchema={schemaAdminPost}
        onSubmit={(values) => {
          //acciones para realizar el submit, acá se conectaría con el back
          console.log(values)
          navigate('/admin/publications')
          setSubmitting(false);
        }}
     >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Box marginBottom="30px">
            <Field
            as={StyledField} 
            name='title'
            label="Título *" 
            fullWidth={true} 
            helperText={<FormHelperText style={{ color: '#222222' }}> {touched.title && errors.title ? errors.title : 'Se visualizará en el título de la publicación'}</FormHelperText>}
            FormHelperTextProps={{ style: { padding: '0', margin: '0 0 5px 0' } }}
            error={touched.title && Boolean(errors.title)}
            />
            <Field
              as={StyledField}
              name='content'
              label="Ingresá el contenido de la publicación *"
              fullWidth={true}
              multiline={true}
              placeholder="Contenido de la publicación *"
              
              helperText={<FormHelperText style={{ color: '#222222', display:'flex', justifyContent: 'space-between'}}>
                <p>{touched.content && errors.content ? errors.content : "Máximo 2.000 caracteres"}</p>
                <p>{`${values.content.length}/2000`}</p></FormHelperText>
                }
              inputProps={{ maxLength: 2000, style: { minHeight: '100px' } }}
              FormHelperTextProps={{ style: { margin :'0', padding:'5px 0 0 0 ' } }}
              error={touched.content && Boolean(errors.content)}  
            />
          </Box>
            {/* mostrar las imágenes cargadas */}
                  {values.images.map((image, index) => (
                  <Box display="flex" justifyContent="center" key={index}>
                    <Box className='img_container' key={index}>
                       <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className="uploaded-image"/>
                       {/* botones de eliminar y editar imágenes */}
                       <button className="btn_edit_img">
                         <EditOutlinedIcon fontSize='small'/>
                       </button>
                       <button className="btn_remove_img" >
                         <DeleteOutlineOutlinedIcon fontSize='small' />
                       </button>
                    </Box>
                  </Box>
                ))}
          <Box display="flex" justifyContent="end" marginBottom="20px">
            {values.images.length >= 3 ? null :
            (
            <Box id='upload_img_section' display="flex" alignItems="center" flexDirection="column">
               <input 
                  type="file" 
                  name="images" 
                  id="upload_img" 
                  hidden 
                  multiple 
                  onChange={(event) => {
                    const files = event.target.files;
                    const newImages = [];
            
                    for (let i = 0; i < files.length; i++) {
                      const file = files[i];
                      // validar tamaño y extensión del archivo
                      if (
                        file.size <= 3072000 &&
                        validFileExtensions.image.includes(file.name.split('.').pop().toLowerCase()) &&
                        newImages.length < 3
                      ) {
                        newImages.push(file);
                      }
                    }
            
                    // actualizar el valor de las imágenes en el estado de Formik
                    setFieldValue('images', [...values.images, ...newImages]);
                  }} 
                  accept="image/*" 
                  disabled={images.length >= 3}
                />
                <label htmlFor="upload_img" className='btn_upload'>
                  <img src={uploadImg} alt="upload_img"/>
                  <Typography variant="body1">Subir Imagen</Typography>
                </label>
                <Box>
                   <p className='req_img' hidden={values.images.length >= 1}>*Requerida al menos una imagen</p>
                   <p className='req_img'>Hasta 3 imágenes</p>
                   <p className='req_img'>Máximo 3MB cada una</p>
                </Box>
            </Box>

            )
            }
          </Box>
          <Box display="flex" justifyContent="center">
            {/* botón submit */}
             <button type='submit' className='submit_btn' disabled={values.images.length === 0}>Cargar publicación</button>
          </Box>
        </Form>
        )}
      </Formik>
    </div>
  );
}
