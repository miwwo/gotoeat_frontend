import React from 'react'
import './Pagination.css'

const Pagination = ({totalRecord, recordPerPage, setCurrentPage, currentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRecord/recordPerPage); i++) {
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
