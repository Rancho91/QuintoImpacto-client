import React, { useEffect, useState } from "react";
import "./styles.css";
import PostsCard from "../../components/PostsCard";
import SearchByChildren from "../../components/SearchFlexible";
import useGetWithParams from "../../utils/services/hooks/useGetWithParams";
import useDevice from "../../utils/services/hooks/useDevice";
import { Grid, useTheme } from "@mui/material";
import CustomPagination from "../../components/Pagination";

export default function PostsView() {
  const theme = useTheme();
  const [page, setPage] = useState(0)
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageSize, setPageSize] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const { isMobile } = useDevice();

  const { data, error } = useGetWithParams({
    url: 'publication',
    size: pageSize,
    pageNumber: page
  })

  useEffect(() => {
    if (isMobile) {
      setPageSize(3)
    } else {
      setPageSize(6)
    }
  }, [isMobile])


  useEffect(() => {
    if (data) {
      setItemsToShow(data?.data?.content)
      setTotalPages(data?.data?.totalPages)
    }
  }, [data])

  const handlePageChange = (newPage) => {
    setPage(newPage - 1)
  }

  return (
    <SearchByChildren>
      <section className="posts-view-background-container" style={{ backgroundColor: theme.palette.verdes.main }}>
        <Grid container direction={'row'} justifyContent={'center'} className='posts-view-grid' columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}>
          {itemsToShow.map((post) => (
            <PostsCard key={post.id} post={post} />
          ))}
        </Grid>
      </section>
      <CustomPagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
    </SearchByChildren>
  );
}
