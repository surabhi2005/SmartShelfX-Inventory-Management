import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { update, findSKUById } from '../../Services/SKUService';

const SKUUpdate = () => {
  const [sku, setSku] = useState({
    skuId: "",
    skuDescription: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      findSKUById(id)
        .then(response => setSku(response.data))
        .catch(error => console.error("Error fetching SKU:", error));
    }
  }, [id]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSku(prev => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!sku.skuDescription.trim()) {
      tempErrors.skuDescription = "SKU Description is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      update(sku)
        .then(() => {
          alert("SKU Updated");
          navigate('/SkuRepo');
        })
        .catch(error => console.error("Error updating SKU:", error));
    }
  };

  const returnBack = () => {
    navigate('/SkuRepo');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '200px',
        padding: '50px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        backgroundColor: 'rgba(242, 242, 242, 0.7)',
      }}
    >
      <div style={{ width: '100%' }}>
        <h2 className="text-center" style={{ letterSpacing: '3px', marginBottom: '30px' }}>
          <u>Update SKU</u>
        </h2>
        <form onSubmit={handleValidation}>
          <div className="form-group mb-3">
            <label style={{ fontWeight: '600' }}>SKU ID</label>
            <input
              type="text"
              name="skuId"
              className="form-control"
              value={sku.skuId}
              readOnly
              style={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '8px',
                width: '100%',
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: '600' }}>SKU Description</label>
            <input
              type="text"
              name="skuDescription"
              className="form-control"
              placeholder="Enter SKU Description"
              value={sku.skuDescription}
              onChange={onChangeHandler}
              style={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '8px',
                width: '100%',
              }}
            />
            {errors.skuDescription && (
              <p style={{ color: 'red', marginTop: '5px' }}>{errors.skuDescription}</p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
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
            <button
              type="submit"
              style={{
                width: '200px',
                fontWeight: 'bold',
                backgroundColor: '#0d6efd',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 0',
              }}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUUpdate;
