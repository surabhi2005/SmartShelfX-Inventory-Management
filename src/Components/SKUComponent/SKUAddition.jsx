import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { save } from '../../Services/SKUService';

const SKUAddition = () => {
  const [sku, setSku] = useState({
    skuId: "",
    skuDescription: "",
  });

  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setSku(values => ({ ...values, [name]: value }));
  };

  const saveSku = (event) => {
    event.preventDefault();
    save(sku).then((response) => {
      alert("New SKU Added");
      navigate('/AdminMenu');
    });
  };
  const returnBack = () => {
    navigate('/AdminMenu');
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!sku.skuId.trim()) {
      tempErrors.skuId = "SKU Id is required";
      isValid = false;
    }

    if (!sku.skuDescription.trim()) {
      tempErrors.skuDescription = "SKU Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveSku(event);
    }
  };

  return (
    <div className="register-form-box"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '200px',
        padding: '50px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        backgroundColor: 'white'
      }}
    >
      <div style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center', letterSpacing: '3px' }}><u>New SKU Addition</u></h2>
        <br />
        <form method="post">
          <div className="form-group">
            <label>SKU ID:</label>
            <input
              placeholder="skuId"
              name="skuId"
              className="form-control"
              value={sku.skuId}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.skuId && <p style={{ color: "red" }}>{errors.skuId}</p>}
          </div>
          <div className="form-group">
            <label>SKU Description:</label>
            <input
              placeholder="skuDescription"
              name="skuDescription"
              className="form-control"
              value={sku.skuDescription}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.skuDescription && <p style={{ color: "red" }}>{errors.skuDescription}</p>}
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', }}>
            <button
              className='btn btn-primary'
              onClick={handleValidation}
              style={{ width: '200px', fontWeight: 'bold' }}
            >
              Submit
            </button>
             <button
              type="button"
              onClick={returnBack}
              style={{
                width: '200px',
                fontWeight: 'bold',
                border: '1px solid #0d6efd',
                color: '#0d6efd',
                backgroundColor: 'white',
                borderRadius: '6px',
                padding: '8px 0',
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUAddition;
