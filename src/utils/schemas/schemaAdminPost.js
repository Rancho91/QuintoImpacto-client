import * as yup from 'yup';

const schemaAdminPost = yup.object().shape({
    title: yup.string()
    .required('El título es requerido'),
    content: yup.string()
    .min(10, 'El texto debe tener al menos 10 caracteres')
    .required('El contenido es requerido'),
});

export default schemaAdminPost;