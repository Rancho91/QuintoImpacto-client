import * as yup from "yup";

export const schemaFormProviders = yup.object().shape({
  name: yup
    .string()
    .required("Este campo es obligatorio")
    .max(25, "El texto no debe exceder los 25 caracteres"),
  shortDescription: yup
    .string()
    .required("Este campo es obligatorio")
    .min(5, "El texto debe tener al menos 5 caracteres")
    .max(50, "El texto no debe exceder los 50 caracteres"),
  category: yup.string().required("Este campo es obligatorio"),
  email: yup
    .string()
    .required("Este campo es obligatorio")
    .email("Formato de correo invalido"),
  phoneNumber: yup
    .string()
    .required("Este campo es obligatorio"),
    // .matches(/^\d{13}$/, "Formato de teléfono invalido"),
    // .matches(/^(+?\d{1,12})?$/, "Formato de teléfono invalido"),
  instagram: yup.string(),
  facebook: yup.string(),
  country: yup.string().required("Este campo es obligatorio"),
  province: yup.string().required("Este campo es obligatorio"),
  city: yup.string().required("Este campo es obligatorio"),
  description: yup
    .string()
    .required("Este campo es obligatorio")
    .max(300, "El texto no debe exceder los 300 caracteres"),
});
