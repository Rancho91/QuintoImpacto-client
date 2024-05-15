import React, { useEffect, useState } from "react";
import "../../assets/styles/Inicio/inicio.css";
import Searchbar from "../../components/Searchbar";
import useGetByNameHook from "../../utils/services/hooks/getHooks";
import { Typography, useTheme } from "@mui/material";
import { NoResultsCard, SearchResultCard } from "../../components/SearchResultsCards";
import { useLocation } from "react-router";
import HomeHeader from "./HomeHeader";
import ProvidersHeader from "./ProvidersHeader";
import PostsHeader from "./PostsHeader";
import useDevice from "../../utils/services/hooks/useDevice";
import CustomPagination from "../Pagination";

export default function SearchByChildren({ children }) {
  const theme = useTheme();
  const location = useLocation();
  const [screen] = useState(() => `${location.pathname.split('/')[1]}`);
  const [searchText, setSearchText] = useState(null);
  const [page, setPage] = useState(null)
  const [itemsToShow, setItemsToShow] = useState(null)
  const [pageSize, setPageSize] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const { isMobile } = useDevice();

  const handleSearch = (evt) => {
    if (evt === "") {
      setSearchText(null);
      setItemsToShow(null)
    }
    else setSearchText(evt);
  };

  const { data, error, loading } = useGetByNameHook({
    url: "/supplier/searchbyname",
    name: searchText,
    size: pageSize,
    pageNumber: page
  });

  useEffect(() => {
    if (isMobile) {
      setPageSize(3)
    } else {
      setPageSize(7)
    }
  }, [isMobile])

  useEffect(() => {
    if (data) {
      setItemsToShow(data?.content);
      setTotalPages(data?.totalPages)
      setPage(data?.number)
    }
  }, [data])

  const handlePageChange = (newPage) => {
    setPage(newPage - 1)
  }

  if (itemsToShow?.length === 0 || searchText === '') {
    return (
      <div className="search-results-screen">
        <Searchbar functionText={handleSearch} text={searchText} />
        <section className="search-results-title-container">
          <Typography variant="titulos" className='search-results-title' sx={{ color: theme.palette.negro.main }}>
            Resultados de tu búsqueda
          </Typography>
        </section>
        <section className="no-results-container">
          <NoResultsCard title={'No se encontraron resultados para tu búsqueda'} subtitle={'Intentá nuevamente con otra consulta'} />
        </section>
      </div>
    );
  }


  if (itemsToShow?.length > 0 && itemsToShow !== null) {
    return (
      <div className="search-results-screen">
        <Searchbar functionText={handleSearch} text={searchText} />
        <section className="search-results-title-container">
          <Typography variant="titulos" className="search-results-title" sx={{ color: theme.palette.negro.main }}>
            Resultados de tu búsqueda
          </Typography>
        </section>
        <section className="search-results-grid">
          {itemsToShow.map((item) => (
            <SearchResultCard key={item.name} supplier={item} />
          ))}
        </section>
        <section className="search-resutls-pagination">
          <CustomPagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className={`home-header-default ${screen}`}>
        <Searchbar functionText={handleSearch} text={searchText} />
        {screen === '' && <HomeHeader />}
        {screen === 'providers' && <ProvidersHeader />}
        {screen === 'posts' && <PostsHeader />}
      </header>
      {children}
    </div>
  );
}
