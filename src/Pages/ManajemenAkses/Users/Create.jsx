
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { toast } from 'react-toastify';

import { buttonStateComplete, buttonStateLoading } from '../../../Components/button.state';
import api from '../../../Util/api';

export const Create = () => {
  const [formInput, setFormInput] = useState({name: '', email: '', role: '', password: ''});
  const [loading, setloading] = useState(true);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);

    const abortController = new AbortController();

    api().get(`api/roles`, {
      params: { no_paginate: true },
      signal: abortController.signal,
    }).then(response => {
      setloading(false);
      setRoles(response.data.data);
    });

    return () => {
      abortController.abort();
    }
  }, []);

  const options = roles.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  });

  const handleFormSubmit = e => {
    const abortController = new AbortController();
    
    e.preventDefault();

    buttonStateLoading('#btn-submit');

    api().post('/api/users', formInput, {
      signal: abortController.signal,
    }).then(response => {
      buttonStateComplete('#btn-submit', 'Simpan');
      toast.success(response.data.message);

      navigate("/manajemen-akses/users", { replace: true });
    }).catch(err => {
      buttonStateComplete('#btn-submit', 'Simpan');
      if (err.response.status === 422) {
        let error = Object.keys(err.response.data.errors);

        error.map(key => toast.error(err.response.data.errors[key][0]));
      } else {
        toast.error(err.response.data.message);
      }
    })
  }

  const handleFormUpdate = e => {
    e.persist();

    setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  const handleSelect = e => setFormInput(prevState => ({...prevState, role: e.value}));
  
  return (
    <>
    <div className='toolbar' id='kt_toolbar'>
      <div id='kt_toolbar_container' className='container-fluid d-flex flex-stack'>
        <div data-kt-swapper='true' data-kt-swapper-mode='prepend' data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'>
          <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Users</h1>
          <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
          <small className='text-muted fs-7 fw-bold my-1 ms-1'>Tambah</small>
        </div>
      </div>
    </div>
    <div className='post d-flex flex-column-fluid' id='kt_post'>
      <div id="kt_content_container" className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3 className="card-title">Tambah User</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6 mb-10">
                    <label className="required form-label" htmlFor="name">Full Name</label>
                    <input type="text" className="form-control" autoComplete="off" name="name" onKeyUp={handleFormUpdate} />
                  </div>
                  <div className="col-md-6 mb-10">
                    <label className="required form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-control" autoComplete="off" name="email" onKeyUp={handleFormUpdate} />
                  </div>
                  <div className="col-md-6 mb-10">
                    <label className="required form-label" htmlFor="role">Role</label>
                    <Select className="form-control p-1" name="role" onChange={handleSelect} isDisabled={loading} options={options} />
                  </div>
                  <div className="col-md-6 mb-10">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control" autoComplete="off" name="password" onKeyUp={handleFormUpdate} />
                    <div className="form-text">Biarkan kosong jika ingin menggunakan password bawaan (12345678).</div>
                  </div>
                </div>
                <button onClick={handleFormSubmit} className="btn btn-success" id="btn-submit">Simpan</button>{" "}
                <Link to="/manajemen-akses/users" className="btn btn-warning">Kembali</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
