import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, productIdGenerate } from "../../Services/ProductService";
import { getSkuIdList } from "../../Services/SKUService";
import "../../LoginView.css";

const ProductAddition = () => {
  const [product, setProduct] = useState({
    productId: "",
    vendorId: "",
    productName: "",
    sku: "",
    purchasePrice: "",
    reorderLevel: "",
    stock: "",
    status: true,
  });
  const [skuList, setSkuList] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    productIdGenerate().then((response) => {
      setProduct((prev) => ({ ...prev, productId: response.data }));
    });

    getSkuIdList().then((response) => {
      setSkuList(response.data);
    });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    let tempErrors = {};
    let isValid = true;

    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }

    if (!product.sku.trim()) {
      tempErrors.sku = "SKU is required";
      isValid = false;
    }

    if (!product.purchasePrice.trim() || product.purchasePrice <= 0) {
      tempErrors.purchasePrice = "Purchase Price cannot be 0 or negative";
      isValid = false;
    }

    if (!product.reorderLevel.trim() || product.reorderLevel <= 0) {
      tempErrors.reorderLevel = "Reorder level of stock cannot be 0 or negative";
      isValid = false;
    }

    if (!product.stock.trim() || product.stock <= 0) {
      tempErrors.stock = "Stock cannot be 0 or negative";
      isValid = false;
    }

    if (!product.vendorId.trim()) {
      tempErrors.vendorId = "Vendor Id is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      const stockVal = Number(product.stock);
      const rolVal = Number(product.reorderLevel);
      const statusVal = stockVal > rolVal;

      addProduct({ ...product, status: statusVal }).then(() => {
        alert("Product Added Successfully");
        navigate("/AdminMenu");
      });
    }
  };

  const handleCancel = () => {
    navigate("/AdminMenu");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          width: "480px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            letterSpacing: "2px",
            fontWeight: "bold",
            color: "#0d6efd",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          New Product Addition
        </h2>

        <form>
          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>Product Id</label>
            <input
              className="form-control"
              name="productId"
              value={product.productId}
              readOnly
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>Vendor Id</label>
            <input
              className="form-control"
              name="vendorId"
              value={product.vendorId}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
            {errors.vendorId && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.vendorId}
              </span>
            )}
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>Product Name</label>
            <input
              className="form-control"
              name="productName"
              value={product.productName}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
            {errors.productName && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.productName}
              </span>
            )}
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>SKU</label>
            <select
              className="form-control"
              name="sku"
              value={product.sku}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            >
              <option value="">Select SKU</option>
              {skuList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.sku && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.sku}
              </span>
            )}
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>Purchase Price</label>
            <input
              type="number"
              className="form-control"
              name="purchasePrice"
              value={product.purchasePrice}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
            {errors.purchasePrice && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.purchasePrice}
              </span>
            )}
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: "600" }}>Reorder Level</label>
            <input
              type="number"
              className="form-control"
              name="reorderLevel"
              value={product.reorderLevel}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
            {errors.reorderLevel && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.reorderLevel}
              </span>
            )}
          </div>

          <div className="form-group mb-4">
            <label style={{ fontWeight: "600" }}>Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={product.stock}
              onChange={onChangeHandler}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
            {errors.stock && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.stock}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleCancel}
              style={{
                width: "48%",
                fontWeight: "bold",
                borderRadius: "6px",
                border: "1px solid #dc3545",
                color: "#dc3545",
                background: "white",
                padding: "8px 0",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
              style={{
                width: "48%",
                fontWeight: "bold",
                border: "none",
                backgroundColor: "#198754",
                color: "white",
                borderRadius: "6px",
                padding: "8px 0",
              }}
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddition;
