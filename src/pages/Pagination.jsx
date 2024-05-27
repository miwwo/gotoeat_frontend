import React from 'react'
import './styles/Pagination.css'

const Pagination = ({totalRecord, recordPerPage, setCurrentPage, currentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRecord/recordPerPage); i++) {
        pages.push(i);
    }
    return (
        <div> {totalRecord <= recordPerPage ? '' :
        <div className='pagination'>
            {pages.map((page) => {
                return (<button key={page}  className={page===currentPage ? 'active' :''}
                                onClick={() => setCurrentPage(page)}>{page}
                   </button>
                );
            })}
        </div>
        }
        </div>
    )
}
export default Pagination
