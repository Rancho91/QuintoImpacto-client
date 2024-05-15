import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchByChildren from "../../../components/SearchFlexible";
import { Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SearchResultCard, NoResultsCard } from "../../../components/SearchResultsCards";
import useGetWithParams from "../../../utils/services/hooks/useGetWithParams";
import useDevice from "../../../utils/services/hooks/useDevice";
import CustomPagination from "../../../components/Pagination";

const ProvidersDetail = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const [page, setPage] = useState(0)
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageSize, setPageSize] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [elements, setElements] = useState(0)
  const { isMobile } = useDevice();

  const { data, error } = useGetWithParams({
    url: 'supplier/searchbycategory',
    category: state?.category?.id,
    size: pageSize,
    pageNumber: page
  })

  useEffect(() => {
    if (isMobile) {
      setPageSize(3)
    }
    if (!isMobile) {
      setPageSize(6)
    }
  }, [isMobile])

  useEffect(() => {
    if (data) {
      setItemsToShow(data?.data?.content)
      setTotalPages(data?.data?.totalPages)
      setElements(data?.data?.totalElements)
    }
  }, [data])

  const handlePageChange = (newPage) => {
    setPage(newPage - 1)
  }

  console.log('pageSize', pageSize)

  return (
    <SearchByChildren>
      <section className="providers-detail-screen">
        <div className="providers-detail-title-container">
          <Typography
            variant="titulos"
            sx={{ fontSize: "24px", color: theme.palette.negro.main, mb: 4 }}
          >
            Categorías
          </Typography>
          <Typography
            variant="subtitulos"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: theme.palette.violeta.main,
            }}
          >
            {state?.category?.category}
          </Typography>
        </div>
        <div className="providers-detail-screen-background" style={{ backgroundColor: theme.palette.verdes.main }}>
          <div className="providers-detail-inner-wrapper">
            <section className="providers-detail-desc-container">
              <Typography
                variant="subtitulos"
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  lineHeight: "20px",
                }}
              >
                Encontrá desde productos cosméticos y de cuidado personal natural, servicios de
                salud, hasta terapias holísticas y más.
              </Typography>
            </section>
            {elements <= 0 && <NoResultsCard title={'No hay proveedores'} subtitle={'Todavía no hay proveedores en esta categoría'} />}
            {elements > 0 && (
              <>
                <section className="providers-detail-grid">
                  {
                    itemsToShow?.map((item) => (
                      <SearchResultCard supplier={item} key={item.id} />
                    ))
                  }
                </section>
                <CustomPagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </section>
    </SearchByChildren>
  );
};

export default ProvidersDetail;
