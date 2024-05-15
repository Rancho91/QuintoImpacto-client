import { useEffect, useState } from "react";
import PostsCard from "../../../components/PostsCard";
import "./adminPublications.css";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetWithParams from "../../../utils/services/hooks/useGetWithParams";
import useDevice from "../../../utils/services/hooks/useDevice";
import CustomPagination from "../../../components/Pagination";

export default function AdminPublications() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageSize, setPageSize] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const { isMobile } = useDevice();

  useEffect(() => {
    if (isMobile) {
      setPageSize(3)
    } else {
      setPageSize(6)
    }
  }, [isMobile])

  const { data, error } = useGetWithParams({
    url: 'publication',
    size: pageSize,
    pageNumber: page
  })

  useEffect(() => {
    if (data) {
      setItemsToShow(data?.data?.content)
      setTotalPages(data?.data?.totalPages)
    }
  }, [data]);

  const handlerRefreshFunction = () => {
    setRefresh(!refresh);
    console.log(refresh);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage - 1)
  }

  return (
    <div className="postsContainer">
      <section className="admin-posts-header">
        <Typography variant="titulos" sx={{ mt: 5, mb: 3 }} >Publicaciones</Typography>
        <button
          className="buttonCrearPublicacion"
          onClick={() => navigate("/admin/posts/create")}
        >
          Crear publicación
        </button>
        <Typography variant="subtitulos" sx={{ mb: 2 }}>Publicaciones cargadas</Typography>
      </section>
      <Grid container direction={'row'} justifyContent={'center'} className='admin-posts-grid' columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}>
        {itemsToShow?.map((post) => (
          <PostsCard
            key={post.id}
            post={post}
            images={itemsToShow?.imagePublicDtoList}
            refreshFunction={handlerRefreshFunction}
          />
        ))}
      </Grid>
      <CustomPagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
}
