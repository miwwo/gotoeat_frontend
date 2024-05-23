import React from 'react'
import './Pagination.css'

const Pagination = ({totalRecipe, recipePerPage, setCurrentPage, currentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRecipe/recipePerPage); i++) {
        pages.push(i);
    }
    return (
        <div className='pagination'>
            {pages.map((page) => {
                return (<button key={page}  className={page===currentPage ? 'active' :''}
                                onClick={() => setCurrentPage(page)}>{page}
                   </button>
                );
            })}
        </div>
    )
}
export default Pagination
