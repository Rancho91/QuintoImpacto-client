/* eslint-disable react/prop-types */
import React from 'react'
import './styles.css'
import { Pagination, Stack } from '@mui/material'

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage)
  }

  return (
    <section className='custom-pagination-main-container'>
      <Stack spacing={3} direction={'row'} justifyContent={'center'} alignItems={'center'} className='custom-pagination-stack'>
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
          color='violeta'
          sx={{ position: 'relative', zIndex: 0 }}
        />
      </Stack>
    </section>
  )
}

export default CustomPagination