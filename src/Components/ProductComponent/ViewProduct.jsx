import React, { useEffect, useState } from 'react';
import { getProductById } from '../../Services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRole } from '../../Services/LoginService';

const ViewProduct = () => {
  const param = useParams();
  const [role, setRole] = useState("");
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    sku: "",
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0.0,
    stock: 0.0,
    vendorId: "",
    status: true,
  });

  const setProductData = () => {
    getProductById(param.pid).then(response => {
      setProduct(response.data);
    });
  };

  const setUserRole = () => {
    getUserRole().then(response => {
      setRole(response.data);
    });
  };

  useEffect(() => {
    setProductData();
    setUserRole();
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate('/AdProdRepo');
    else if (role === "Manager") navigate('/MngProdRepo');
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "120px" }}>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "40px 50px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "500px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3
          className="text-center"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "25px",
            color: "#0d6efd",
          }}
        >
          View Product Details
        </h3>

        <div className="card-body" style={{ lineHeight: "1.8" }}>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Product Id:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.productId}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              SKU:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.sku}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Product Name:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.productName}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Purchase Price:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.purchasePrice}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Sales Price:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.salesPrice}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Reorder Level:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.reorderLevel}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Stock:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.stock}</span>
            </label>
          </div>
          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Vendor:&nbsp;
              <span style={{ fontWeight: "normal" }}>{product.vendorId}</span>
            </label>
          </div>

          <div className="row">
            <label style={{ fontWeight: "600" }}>
              Stock Status:&nbsp;
              {product.status === true ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Permitted to Issue
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Reorder Level Reached
                </span>
              )}
            </label>
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              className="btn btn-success"
              onClick={returnBack}
              style={{
                width: "150px",
                fontWeight: "bold",
                backgroundColor: "#198754",
                border: "none",
                borderRadius: "6px",
                padding: "8px 0",
              }}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
