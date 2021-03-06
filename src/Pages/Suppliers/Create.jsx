import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buttonStateComplete, buttonStateLoading } from '../../Components/button.state';
import api from '../../Util/api';

export const Create = () => {

  const [ formInput, setFormInput ] = useState({name: '', email: '', phone_number: '', address: ''});
  const navigate = useNavigate();

  const Toast = window['Swal'].mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', window['Swal'].stopTimer)
      toast.addEventListener('mouseleave', window['Swal'].resumeTimer)
    }
  })

  const handleFormSubmit = e => {
    const abortController = new AbortController();
    
    e.preventDefault();

    buttonStateLoading('#btn-submit');

    api().post('/api/suppliers', formInput, {
      signal: abortController.signal,
    }).then(response => {
      buttonStateComplete('#btn-submit', 'Simpan');
      Toast.fire({
        icon: 'success',
        title: response.data.message,
      });

      navigate('/supplier/data-supplier', {replace: true});
    }).catch(err => {

      window['toastr'].clear();

      if (err.response.status === 422) {          
        buttonStateComplete('#btn-submit', 'Simpan');
        let error = Object.keys(err.response.data.errors);

        error.map(key => {
          return window['toastr'].error(err.response.data.errors[key][0]);
        });
      } else {
        buttonStateComplete('#btn-submit', 'Simpan');
        window['toastr'].error(err.response.data.message);
      }
    })
  }

  const handleFormUpdate = e => {
    e.persist();

    setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  return (
    <>
    <div className='toolbar' id='kt_toolbar'>
      <div id='kt_toolbar_container' className='container-fluid d-flex flex-stack'>
        <div data-kt-swapper='true' data-kt-swapper-mode='prepend' data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'>
          <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Supplier</h1>
          <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
          <small className='text-muted fs-7 fw-bold my-1 ms-1'>Tambah</small>
        </div>
      </div>
    </div>
    <div className='post d-flex flex-column-fluid' id='kt_post'>
      <div id="kt_content_container" className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3 className="card-title">Tambah Supplier</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <form action="/">
                  <div className="row">
                    <div className="col-md-12 mb-10">
                      <label className="required form-label">Nama Supplier</label>
                      <input type="text" className="form-control" autoComplete="off" name="name" onChange={handleFormUpdate} />
                    </div>
                    <div className="col-md-6 mb-10">
                      <label className="required form-label">Email</label>
                      <input type="email" className="form-control" autoComplete="off" name="email" onChange={handleFormUpdate} />
                    </div>
                    <div className="col-md-6 mb-10">
                      <label className="required form-label">Phone Number</label>
                      <input type="text" className="form-control" autoComplete="off" name="phone_number" onChange={handleFormUpdate} />
                    </div>
                    <div className="col-md-12 mb-10">
                      <label className="form-label">Address</label>
                        <textarea className="form-control" name="address" rows="3" onChange={handleFormUpdate} ></textarea>
                      </div>
                  </div>
                  <button onClick={handleFormSubmit} className="btn btn-success" id="btn-submit">Simpan</button>{" "}
                  <Link to="/supplier/data-supplier" className="btn btn-warning">Kembali</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}