import axios from "axios";
import { LOCAL_URL } from "./constants";
// Configurar la URL base
const instanceAxios = axios.create({
  baseURL: LOCAL_URL,
});

export default instanceAxios;
