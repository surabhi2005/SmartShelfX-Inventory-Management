import React, { useEffect, useState } from 'react';
import { getUserRole } from '../../Services/LoginService';
import { getProductById, priceUpdate } from '../../Services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';

const EditProductPrice = () => {
  const param = useParams();
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    sku: "",
    purchasePrice: "",
    salesPrice: "",
    reorderLevel: "",
    stock: "",
    vendorId: "",
    status: true,
  });

  useEffect(() => {
    setProductData();
    setUserRole();
  }, []);

  const setProductData = () => {
    getProductById(param.pid)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        alert("Could not load product details.");
      });
  };

  const setUserRole = () => {
    getUserRole().then((response) => {
      setRole(response.data);
    });
  };

  const returnBack = () => {
    if (role === "Admin") navigate("/AdProdRepo");
    else if (role === "Manager") navigate("/MngProdRepo");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    const price = parseFloat(product.purchasePrice);

    if (!product.purchasePrice || product.purchasePrice.trim() === "") {
      tempErrors.purchasePrice = "Purchase price is required";
      isValid = false;
    } else if (isNaN(price) || price <= 0) {
      tempErrors.purchasePrice = "Purchase price must be a positive number";
      isValid = false;
    }
    

    setErrors(tempErrors);
    if (isValid) {
      priceEdit(event);
    }
  };

  const priceEdit = (event) => {
    event.preventDefault();
    priceUpdate(product)
      .then(() => {
        alert("Product Prices Updated!");
        returnBack();
      })
      .catch((error) => {
        console.error("Error updating prices:", error);
        alert("Failed to update prices. Please try again.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "480px",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h3
          style={{
            color: "#0d6efd",
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          <u>Edit Product Price</u>
        </h3>

        <div style={{ marginBottom: "10px" }}>
          <label><b>Product Id:</b> &nbsp;{product.productId}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>SKU:</b> &nbsp;{product.sku}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>Product Name:</b> &nbsp;{product.productName}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>Current Purchase Price:</b> &nbsp;{product.purchasePrice}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>Sales Price:</b> &nbsp;{product.salesPrice}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>Reorder Level:</b> &nbsp;{product.reorderLevel}</label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label><b>Stock:</b> &nbsp;{product.stock}</label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label><b>Vendor:</b> &nbsp;{product.vendorId}</label>
        </div>

        <form onSubmit={handleValidation}>
          <div style={{ marginBottom: "20px" }}>
            <b><label htmlFor="purchasePrice">Edit New Purchase Price:</label></b>
            <input
              id="purchasePrice"
              type="number"
              placeholder="Enter new purchase price"
              name="purchasePrice"
              className="form-control"
              value={product.purchasePrice}
              onChange={onChangeHandler}
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
                marginTop: "5px",
                outline: "none",
              }}
            />
            {errors.purchasePrice && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {errors.purchasePrice}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <button
              type="submit"
              style={{
                width: "48%",
                fontWeight: "bold",
                backgroundColor: "#198754",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 0",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={returnBack}
              style={{
                width: "48%",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "#6c757d",
                border: "1px solid #6c757d",
                borderRadius: "6px",
                padding: "8px 0",
                cursor: "pointer",
              }}
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPrice;
