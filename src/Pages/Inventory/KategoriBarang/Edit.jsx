import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSanctum } from 'react-sanctum';
import { toast } from 'react-toastify';
import Select from 'react-select';

import api from '../../../Util/api';
import { buttonStateComplete, buttonStateLoading } from '../../../Components/button.state';
import { clearValidation, validate } from '../../../Util/validations';

export const Edit = () => {
  const { signOut } = useSanctum();
  const [formInput, setFormInput] = useState({name: '', parent_id: ''});
  const [loading, setloading] = useState(true);
  const [categories, setCategories] = useState([]);
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);

    const abortController = new AbortController();

    api().get(`api/category/${urlParams.categoryId}`).then(response => {
      const categoryData = response.data;

      setFormInput({
        name: categoryData.name,
        parent_id: categoryData.parent_id,
      });
      
      api().get(`api/category`, {
        params: { no_paginate: true },
        signal: abortController.signal,
      }).then(response => {
        setloading(false);
        setCategories(response.data.data);
      }).catch(err => {
        if (err.response?.status === 401) {
          signOut();
        }
      });
    });

    return () => {
      abortController.abort();
    }
  }, [signOut, urlParams]);

  const options = categories.map(item => {
    return {
      label: item?.name,
      value: item?.id
    }
  });

  const handleFormSubmit = e => {
    const abortController = new AbortController();

    clearValidation();
    
    e.preventDefault();

    buttonStateLoading('#btn-submit');

    api().put(`/api/category/${urlParams.categoryId}`, formInput, {
      signal: abortController.signal,
    }).then(response => {
      buttonStateComplete('#btn-submit', 'Simpan');
      toast.success(response.data.message);

      navigate("/inventory/kategori-barang", { replace: true });
    }).catch(err => {
      buttonStateComplete('#btn-submit', 'Simpan');
      if (err.response.status === 422) {
        let error = Object.keys(err.response.data.errors);

        error.map(key => validate(`[name="${key}"]`, err.response.data.errors[key][0]));
      } else {
        toast.error(err.response.data.message);
      }
    })
  }

  const handleFormUpdate = e => {
    e.persist();

    setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  const handleSelect = e => setFormInput(prevState => ({...prevState, parent_id: e?.value ?? ''}));

  return (
    <>
    <div className='toolbar' id='kt_toolbar'>
      <div id='kt_toolbar_container' className='container-fluid d-flex flex-stack'>
        <div data-kt-swapper='true' data-kt-swapper-mode='prepend' data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'>
          <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Kategori Barang</h1>
          <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
          <small className='text-muted fs-7 fw-bold my-1 ms-1'>Edit</small>
        </div>
      </div>
    </div>
    <div className='post d-flex flex-column-fluid' id='kt_post'>
      <div id="kt_content_container" className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3 className="card-title">Edit Kategori Barang</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <form action="/">
                  <div className="row">
                    <div className="col-md-6 mb-10">
                      <label className="required form-label" htmlFor="name">Nama Kategori</label>
                      <input type="text" className="form-control" autoComplete="off" name="name" onChange={handleFormUpdate} disabled={loading} defaultValue={formInput.name} />
                    </div>
                    <div className="col-md-6 mb-10">
                      <label className="form-label" htmlFor="parent_id">Parent</label>
                      <Select className="form-control p-1" name="parent_id" onChange={handleSelect} isDisabled={loading} options={options} placeholder="Pilih parent kategori" isClearable={true} value={
                        options.filter(option => option.value === formInput.parent_id)
                      } />
                    </div>
                  </div>
                  <button className="btn btn-success" id="btn-submit" onClick={handleFormSubmit} disabled={loading}>Simpan</button>{" "}
                  <Link to="/inventory/kategori-barang" className="btn btn-warning">Kembali</Link>
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
