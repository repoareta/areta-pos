import React, { useState, useEffect } from 'react';
import { useSanctum } from 'react-sanctum';
import { Link } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';

import api from '../../../Util/api'
import Table from '../../../Components/PageComponent/Table';
import { asset } from '../../../Util/commonHelpers';
import TablePagination from '../../../Components/PageComponent/TablePagination';
import { defaultBlueprint } from '../../../Components/pagination.blueprint';
import { deleteHandler } from '../../../Components/deleteHandler';

export default function MasterBarang() {
  const {signOut} = useSanctum()
  const [toggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginated, setPaginated] = useState(defaultBlueprint);
  const [params, setParams] = useState({search: '', length: 5});

  const tableHeader = [
    {
      title: "Nama Produk",
      className: "ps-4 min-w-300px rounded-start",
    },
    {
      title: "Deskripsi",
      className: "min-w-200px"
    },
    {
      title: "Status",
      className: "text-center",
    },
    {
      title: "Stok Awal",
      className: "text-center",
    },
    {
      title: "",
      className: "min-w-200px text-end rounded-end",
    },
  ]

  useEffect(() => {    
    setIsLoading(true);

    const abortController = new AbortController();

    api().get(`/api/product?page=${currentPage}&relations=category`, {
      signal: abortController.signal,
      params: params,
    }).then(response => {
      setPaginated(response.data.data);
      setIsLoading(false);
    }).catch(err => {
      if (err.response?.status === 401) {
        signOut();
      }
    });

    return () => {
      abortController.abort();
    };
  }, [currentPage, signOut, params]);

  const searchHandler = (e) => {
    let searchValue = document.getElementById('search').value;
    
    setCurrentPage(1);
    setParams(prevState => ({...prevState, search: searchValue}));
  }

  const pageLength = e => {
    e.persist();

    setParams(prevState => ({...prevState, length: e.target.value}));
  }

  let products = paginated.data.length === 0 ? 
  <tr>
    <td colSpan={tableHeader.length} className="text-center">
      <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">Barang tidak ditemukan.</span>
    </td>
  </tr> :
  paginated.data.map((item, index) => {
    return (
      <tr key={index}>
        <td className="ps-2">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-50px me-5">
              <img src={asset("assets/media/products/box.png")} className="h-75 align-self-end" alt="product" />
            </div>
            <div className="d-flex justify-content-start flex-column">
              <span className="text-dark fw-bolder text-hover-primary cursor-pointer mb-1 fs-6">{item.name}</span>
              <span className="text-muted fw-bold text-muted d-block fs-7">{item.category?.map((category, index) => {
                return (item.category.length - 1) === index ? category.name : `${category.name}, `;
              })}</span>
            </div>
          </div>
        </td>
        <td>
          <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6 text-truncate" style={{maxWidth: '300px'}}>
            {item.description}
          </span>
        </td>
        <td className="text-center">
          <Toggle
            style={{ width: '105px', height: '36px' }}
            offstyle="danger"
            onClick={() => setToggle(!toggle)}
            size="sm"
            handlestyle="light"
            active={item.is_active}
            on="Aktif"
            off="Nonaktif"
          />
        </td>
        <td className="text-center">
          <span className="text-dark fw-bolder text-hover-primary cursor-pointer d-block mb-1 fs-6">{parseInt(item.initial_stock)}</span>
        </td>
        <td className="text-end pe-2">
          <Link to={`/inventory/master-barang/${item.id}/edit`} className="badge badge-success p-3 me-1">
            <i className="fas fa-pen fs-5 text-white"></i>
          </Link>
          <Link to="/" className="badge badge-danger p-3" onClick={(e) => {
            e.preventDefault();
            e.target.classList.add('disabled');
            deleteHandler(item.id, setParams, 'product');
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
            <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Master Barang</h1>
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
                  <input type="text" className="form-control form-control-solid ps-10" name="search" id="search" placeholder="Nama Barang"/>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-light text-hover-primary me-5" onClick={searchHandler}>Cari</button>
                </div>
              </div>
              <div className="card-toolbar">
                <Link to="/inventory/master-barang/create" replace={true} className="btn btn-primary">
                  Tambah Barang
                </Link>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="table-responsive">
                    <Table loadingState={isLoading} tableHeader={tableHeader} tableBody={products} />
                  </div>
                  <TablePagination 
                    loadingState={isLoading}
                    paginationApi={paginated}
                    currentPage={currentPage}
                    loadingSetter={setIsLoading}
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
