import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../../Components/PageComponent/Table';
import TablePagination from '../../../Components/PageComponent/TablePagination';
import { defaultBlueprint } from '../../../Components/pagination.blueprint';
import api from '../../../Util/api';
import { useSanctum } from 'react-sanctum';
import { deleteHandler } from '../../../Components/deleteHandler';

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(defaultBlueprint);
  const [params, setParams] = useState({length: 5, search: ""});
  const { signOut } = useSanctum();
  
  const tableHeader = [
    {
      title: "Username",
      className: "ps-4 rounded-start",
    },
    {
      title: "Email",
      className: "",
    },
    {
      title: "Role",
      className: ""
    },
    {
      title: "",
      className: "min-w-200px text-end rounded-end",
    },
  ]

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    api().get(`api/users?page=${currentPage}&relations=roles`, {
      params: params,
      signal: abortController.signal,
    }).then(response => {
      setItems(response.data.data);
      setLoading(false);
    }).catch(err => {
      if (err.response?.status === 401) {
        signOut();
      }
    })
    
    return () => {
      abortController.abort();
    }
  }, [params, signOut, currentPage]);
  
  const searchHandler = () => {
    let searchValue = document.getElementById('search').value;

    setParams(prevState => ({...prevState, search: searchValue}));
  }

  const pageLength = e => {
    e.persist();

    setParams(prevState => ({...prevState, length: e.target.value}));
  }

  let content = items.data.length === 0 ? 
  <tr>
    <td colSpan={tableHeader.length} className="text-center">
      <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">User tidak ditemukan.</span>
    </td>
  </tr> :
  items.data.map((item, index) => {
    return (
      <tr key={index}>
        <td className="ps-4">
          <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">{item.name}</span>
        </td>
        <td>
          <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">{item.email}</span>
        </td>
        <td>
          <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">{
            item.roles[0].name
          }</span>
        </td>
        <td className="text-end pe-2">
          <Link to={`/manajemen-akses/users/edit/${item.id}`} className="badge badge-success p-3 me-1">
            <i className="fas fa-pen fs-5 text-white"></i>
          </Link>
          <Link to="/" className="badge badge-danger p-3" onClick={(e) => {
            e.preventDefault();
            deleteHandler(item.id, setCurrentPage, 'users');
          }}>
            <i className="fas fa-trash fs-5 text-white"></i>
          </Link>
        </td>
      </tr>
    )
  })
  
  return (
    <>
      <div className='toolbar' id='kt_toolbar'>
        <div id='kt_toolbar_container' className='container-fluid d-flex flex-stack'>
          <div data-kt-swapper='true' data-kt-swapper-mode='prepend' data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'>
            <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Data Users</h1>
            <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
            <small className='text-muted fs-7 fw-bold my-1 ms-1'>List Page</small>
          </div>
        </div>
      </div>
      <div className='post d-flex flex-column-fluid' id='kt_post'>
        <div id='kt_content_container' className='container-xxl'>
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <div className="d-flex align-items-center">
                <div className="position-relative w-md-400px me-2">
                  <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                      <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
                    </svg>
                  </span>
                  <input type="text" className="form-control form-control-solid ps-10" name="search" id="search" placeholder="Username / Email"/>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-light text-hover-primary me-5" onClick={searchHandler}>Cari</button>
                </div>
              </div>
              <div className="card-toolbar">
                <Link to="/manajemen-akses/users/create" replace={true} className="btn btn-primary">
                  Tambah User
                </Link>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="table-responsive">
                    <Table loadingState={loading} tableHeader={tableHeader} tableBody={content} />
                  </div>
                  <TablePagination
                    loadingState={loading}
                    paginationApi={items}
                    currentPage={currentPage}
                    loadingSetter={setLoading}
                    currentPageSetter={setCurrentPage}
                    pageLengthSetter={pageLength}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
