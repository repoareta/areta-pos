import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSanctum } from 'react-sanctum';
import Select from 'react-select';
import { toast } from 'react-toastify';

import api from '../../../Util/api';
import { buttonStateComplete, buttonStateLoading } from '../../../Components/button.state';
import { clearValidation, validate } from '../../../Util/validations';

export const Create = () => {
  const { signOut } = useSanctum();
  const [formInput, setFormInput] = useState({name: '', category: [], initial_stock: 0, unit_id: '', image: null, description: ''});
  const [loading, setloading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);

    const abortController = new AbortController();

    api().get(`api/category`, {
      params: {
        no_paginate: true,
        no_filter: true,
      },
      signal: abortController.signal,
    }).then(response => {
      setCategories(response.data.data);

      api().get(`api/units`, {
        params: { no_paginate: true },
        signal: abortController.signal,
      }).then(response => {
        setloading(false);
        setUnits(response.data.data);
      }).catch(err => {
        if (err.response?.status === 401) {
          signOut();
        }
      });
    }).catch(err => {
      if (err.response?.status === 401) {
        signOut();
      }
    });

    return () => {
      abortController.abort();
    }
  }, [signOut]);

  const handleFormSubmit = e => {
    const abortController = new AbortController();

    const formData = new FormData();

    Object.keys(formInput).map(key => {
      return formData.append(key, formInput[key]);
    });

    clearValidation();
    
    e.preventDefault();

    buttonStateLoading('#btn-submit');

    api().post('/api/product', formData, {
      signal: abortController.signal,
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      buttonStateComplete('#btn-submit', 'Simpan');
      toast.success(response.data.message);

      navigate("/inventory/master-barang", { replace: true });
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

  const categoriesOptions = categories.map(item => {
    return {
      label: item?.name,
      value: item?.id,
    }
  });

  const unitsOptions = units.map(item => {
    return {
      label: item?.name,
      value: item?.id,
    }
  });

  const handleFormUpdate = e => {
    e.persist();

    setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  const handleCategoriesInput = e => {
    setFormInput(prev => ({...prev, category: e.map(item => item.value)}));
  }

  const handleUnitsInput = e => {
    setFormInput(prev => ({...prev, unit_id: e.value}));
  }
  
  const handleImageInput = e => {
    setFormInput(prev => ({...prev, image: e.target.files[0]}));
  }

  return (
    <>
    <div className='toolbar' id='kt_toolbar'>
      <div id='kt_toolbar_container' className='container-fluid d-flex flex-stack'>
        <div data-kt-swapper='true' data-kt-swapper-mode='prepend' data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'>
          <h1 className='d-flex align-items-center text-dark fw-bolder fs-3 my-1 py-3'>Master Barang</h1>
          <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
          <small className='text-muted fs-7 fw-bold my-1 ms-1'>Tambah</small>
        </div>
      </div>
    </div>
    <div className='post d-flex flex-column-fluid' id='kt_post'>
      <div id="kt_content_container" className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3 className="card-title">Tambah Master Barang</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6 mb-10">
                    <label className="required form-label">Nama Barang</label>
                    <input type="text" className="form-control" autoComplete="off" name="name" disabled={loading} onKeyUp={handleFormUpdate} />
                  </div>
                  <div className="col-md-6 mb-10">
                    <label className="required form-label">Kategori Barang</label>
                    <Select className="form-control p-1" name="category[]" onChange={handleCategoriesInput} isDisabled={loading} options={categoriesOptions} placeholder="Pilih kategori" isClearable={true} isMulti={true} />
                  </div>
                  <div className="col-md-4 mb-10">
                    <label className="required form-label">Stok Awal</label>
                    <input type="number" className="form-control" autoComplete="off" name="initial_stock" disabled={loading} onKeyUp={handleFormUpdate} />
                  </div>
                  <div className="col-md-4 mb-10">
                    <label className="required form-label">Unit</label>
                    <Select className="form-control p-1" name="unit_id" onChange={handleUnitsInput} isDisabled={loading} options={unitsOptions} placeholder="Pilih unit" isClearable={true} />
                  </div>
                  <div className="col-md-4 mb-10">
                    <label className="required form-label">Gambar</label>
                    <input type="file" className="form-control" name="image" disabled={loading} onChange={handleImageInput} />
                  </div>
                  <div className="col-md-12 mb-10">
                    <label className="form-label">Dekripsi</label>
                    <textarea className="form-control" autoComplete="off" rows={3} name="description" disabled={loading} onKeyUp={handleFormUpdate} />
                  </div>
                </div>
                <button className="btn btn-success" id="btn-submit" onClick={handleFormSubmit} disabled={loading}>Simpan</button>{" "}
                <Link to="/inventory/master-barang" className="btn btn-warning">Kembali</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
