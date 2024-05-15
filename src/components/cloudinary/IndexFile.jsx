import { useEffect, useState } from "react";
import convertFileToBase64 from "../../utils/convert/convertFileToBase64";
import "./indexFile.css";
export default function IndexFile({ functionLoad, type }) {
  const [file, setFile] = useState();
 


  const HandlerLoadFile = async (event) => {
    const loadedFile = event.target.files[0];
    const fileSize = loadedFile.size / 1024 / 1024; // Tamaño en MB

    if (fileSize > 3) {
      alert("El tamaño máximo permitido es de 3MB");
      input.value = ""; // Borra el archivo seleccionado
    }
    const name = loadedFile.name
    const fileBase64 = await convertFileToBase64(loadedFile);
    functionLoad(fileBase64, name);
    setFile(fileBase64);
  };

  if (type === "input") {
    return (
      <div>
        <input
          type="file"
          placeholder="texto para imagen"
          id="fileEdit"
          className="inputFile"
          onChange={HandlerLoadFile}
          accept=".jpg, .jpeg, .png"
        />
        <label htmlFor="fileEdit" className="buttonImput">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z"
              fill="#FAFAFA"
            />
          </svg>
          <span className="labelText">Subir imagen</span>
        </label>
        <div className="validContainer">
          <span className="validText">*Requerida al menos una imagen</span>
          <span className="validText">Hasta 3 imágenes.</span>
          <span className="validText">Máximo 3Mb cada una</span>
        </div>
      </div>
    );
  }
  if (type === "edit") {
    return (
      <>
        <input
          type="file"
          placeholder="texto para imagen"
          id="file"
          className="inputFileEdit"
          onChange={HandlerLoadFile}
          accept=".jpg, .jpeg, .png"
        />
        <label htmlFor="file" className="editStyle">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.60103 4.68255L9.31648 5.398L2.2708 12.4437H1.55534V11.7282L8.60103 4.68255ZM11.4006 0.000976562C11.2062 0.000976562 11.004 0.0787435 10.8563 0.226501L9.43314 1.64964L12.3494 4.5659L13.7725 3.14276C14.0758 2.83947 14.0758 2.34954 13.7725 2.04625L11.9528 0.226501C11.7973 0.0709668 11.6028 0.000976562 11.4006 0.000976562ZM8.60103 2.48174L0 11.0828V13.999H2.91626L11.5173 5.398L8.60103 2.48174Z"
              fill="#FAFAFA"
            />
          </svg>
        </label>
      </>
    );
  }
}
