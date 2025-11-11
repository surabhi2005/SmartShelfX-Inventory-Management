import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../Services/ProductService";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminProductReport = () => {
  const [products, setProducts] = useState([]);

  const setProductData = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert("Error occurred while loading data: " + error);
      });
  };

  useEffect(() => {
    setProductData();
  }, []);

  const removeProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then(() => {
          setProducts(products.filter((p) => p.productId !== id));
        })
        .catch((error) => {
          alert("Error while deleting product: " + error);
        });
    }
  };

  const buttonBase = {
    border: "none",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "500",
    transition: "transform 0.2s, opacity 0.2s",
    whiteSpace: "nowrap",
  };

  const hoverStyle = {
    transform: "scale(1.05)",
    opacity: 0.9,
  };

  return (
    <div
      className="text-center"
      style={{
        padding: "20px",
        overflowX: "hidden",
        maxWidth: "100%",
      }}
    >
      <div className="container" style={{ maxWidth: "100%" }}>
        <h3 className="mb-2">Product Report</h3>
        <hr style={{ margin: "10px 0 20px" }} />

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "7% 7% 11% 8% 10% 9% 6% 10% 10% 22%",
            padding: "8px 10px",
            fontWeight: "bold",
            fontSize: "13px",
            backgroundColor: "#797474ff",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          <span>ID</span>
          <span>SKU</span>
          <span>Product Name</span>
          <span>Vendor</span>
          <span>Purchase Price</span>
          <span>Sales Price</span>
          <span>Stock</span>
          <span>Reorder</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Product Rows */}
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.productId}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "7% 7% 11% 8% 10% 9% 6% 10% 10% 22%",
                alignItems: "center",
                padding: "6px 10px",
                marginBottom: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                borderRadius: "8px",
                backgroundColor: p.status
                  ? "rgba(179, 237, 179, 0.8)"
                  : "rgba(224, 158, 158, 0.8)",
                fontSize: "13px",
              }}
            >
              <span>{p.productId}</span>
              <span>{p.sku}</span>
              <span>{p.productName}</span>
              <span>{p.vendorId}</span>
              <span>₹{p.purchasePrice}</span>
              <span>₹{p.salesPrice}</span>
              <span style={{ fontWeight: "bold" }}>{p.stock}</span>
              <span>{p.reorderLevel}</span>
              <span>
                {p.status ? (
                  <span style={{ color: "rgba(15, 40, 15, 0.8)" }}>Permitted to Issue</span>
                ) : (
                  <span style={{ color: "red" }}>Reorder Level Reached</span>
                )}
              </span>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  flexWrap: "nowrap",
                }}
              >
                <Link to={`/view-product/${p.productId}`}>
                  <button
                    style={{ ...buttonBase, backgroundColor: "#0d6efd" }}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, hoverStyle)
                    }
                    onMouseOut={(e) =>
                      Object.assign(e.target.style, buttonBase)
                    }
                  >
                    View
                  </button>
                </Link>

                <Link to={`/edit-stock/${p.productId}/2`}>
                  <button
                    style={{
                      ...buttonBase,
                      backgroundColor: "#ffc107",
                      color: "black",
                    }}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, hoverStyle)
                    }
                    onMouseOut={(e) =>
                      Object.assign(e.target.style, buttonBase)
                    }
                  >
                    Issue
                  </button>
                </Link>

                <Link to={`/edit-stock/${p.productId}/1`}>
                  <button
                    style={{ ...buttonBase, backgroundColor: "#198754" }}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, hoverStyle)
                    }
                    onMouseOut={(e) =>
                      Object.assign(e.target.style, buttonBase)
                    }
                  >
                    Purchase
                  </button>
                </Link>

                <Link to={`/edit-price/${p.productId}`}>
                  <button
                    style={{ ...buttonBase, backgroundColor: "#6c757d" }}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, hoverStyle)
                    }
                    onMouseOut={(e) =>
                      Object.assign(e.target.style, buttonBase)
                    }
                  >
                    Price
                  </button>
                </Link>

                <button
                  onClick={() => removeProduct(p.productId)}
                  style={{ ...buttonBase, backgroundColor: "#dc3545" }}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, hoverStyle)
                  }
                  onMouseOut={(e) =>
                    Object.assign(e.target.style, buttonBase)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              marginTop: "30px",
              color: "gray",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            No products available.
          </div>
        )}

        {/* Return Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/AdminMenu"
            style={{
              display: "inline-block",
              border: "1px solid black",
              padding: "8px 25px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
              backgroundColor: "white",
            }}
          >
            ← Return
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProductReport;
