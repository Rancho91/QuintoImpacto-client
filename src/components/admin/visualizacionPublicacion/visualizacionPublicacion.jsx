import { Typography } from "@mui/material";
import "./visualizacionPublicacion.css";
import useGetAll from "../../../utils/services/hooks/useGetAll";
import useUser from "../../../utils/services/hooks/useUser";
export default function VisualizacionPublicacion() {
  const {token} = useUser()
  const {data} = useGetAll({url:"statistics/publicationByQuantityViews",token,needsAuth:true})
  return (
    <div className="container">
      <div>
        <h1 className="title" >
          Visualizaciones por Publicación
        </h1>
      </div>
      {data?.data?.map((a, i) => {
        return (
          <div className="boxVisualizacion" key={i}>
            <div className="publiucation">
              <Typography variant="subtitulos">
                {a.title}
              </Typography>
              <Typography variant="subtitulos">{a.fechaCreacion} </Typography>
            </div>
            <div className="vistas">
              <svg
                width="40"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 6.5C16.29 6.5 19.67 8.63 21.32 12C19.67 15.37 16.3 17.5 12.5 17.5C8.7 17.5 5.33 15.37 3.68 12C5.33 8.63 8.71 6.5 12.5 6.5ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5ZM12.5 9.5C13.88 9.5 15 10.62 15 12C15 13.38 13.88 14.5 12.5 14.5C11.12 14.5 10 13.38 10 12C10 10.62 11.12 9.5 12.5 9.5ZM12.5 7.5C10.02 7.5 8 9.52 8 12C8 14.48 10.02 16.5 12.5 16.5C14.98 16.5 17 14.48 17 12C17 9.52 14.98 7.5 12.5 7.5Z"
                  fill="#4E169D"
                />
              </svg>
              <p className="count">{a.views}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
