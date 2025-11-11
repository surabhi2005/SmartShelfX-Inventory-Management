import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { getAllProducts } from "../../Services/ProductService";

const ManagerProductReport = () => {
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

  const containerStyle = {
    padding: "30px",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 50px",
    justifyContent: "space-between",
    fontWeight: "bolder",
    marginBottom: "10px",
  };

  const spanWidths = [
    "8%", "10%", "14%", "10%", "10%",
    "10%", "8%", "10%", "16%", "10%",
  ];

  const productItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 50px",
    boxSizing: "border-box",
    boxShadow: "0 4px 8px rgba(54, 54, 54, 0.1)",
    borderRadius: "12px",
    marginBottom: "15px",
  };

  const spanStyle = {
    display: "inline-block",
    textAlign: "left",
    fontWeight: 500,
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  };

  const viewButton = {
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "white",
    backgroundColor: "#0d6efd",
    cursor: "pointer",
  };

  const issueButton = {
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "black",
    backgroundColor: "#ffc107",
    cursor: "pointer",
  };

  const purchaseButton = {
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "white",
    backgroundColor: "#198754",
    cursor: "pointer",
  };

  const backButton = {
    display: "inline-block",
    border: "1px solid black",
    padding: "10px 30px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "black",
    fontWeight: 600,
    backgroundColor: "white",
    marginTop: "30px",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={containerStyle}>
        <h2 className="mb-0">📦 Product Report</h2>
        <hr/>
        <div style={headerStyle}>
          {[
            "Product Id",
            "SKU",
            "Product Name",
            "Vendor Id",
            "Purchase Price",
            "Sales Price",
            "Stock",
            "Reorder Level",
            "Stock Status",
            "Actions",
          ].map((text, index) => (
            <span key={index} style={{ ...spanStyle, width: spanWidths[index] }}>
              {text}
            </span>
          ))}
        </div>
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.productId}
              style={{
                ...productItemStyle,
                backgroundColor:
                  p.status === false
                    ? "#ffa5adff"
                    : "rgba(195, 238, 191, 0.7)",
              }}
            >
              <span style={{ ...spanStyle, width: spanWidths[0] }}>
                {p.productId}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[1] }}>
                {p.sku}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[2] }}>
                {p.productName}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[3] }}>
                {p.vendorId}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[4] }}>
                {p.purchasePrice}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[5] }}>
                {p.salesPrice}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[6] }}>
                {p.stock}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[7] }}>
                {p.reorderLevel}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[8] }}>
                {p.status === true ? (
                  <span style={{ color: "green" }}>Permitted to Issue</span>
                ) : (
                  <span style={{ color: "red" }}>Reorder Level Reached</span>
                )}
              </span>
              <span style={{ ...spanStyle, width: spanWidths[9] }}>
                <div style={buttonContainer}>
                  <Link to={`/view-product/${p.productId}`}>
                    <button style={viewButton}>View</button>
                  </Link>
                  <Link to={`/edit-stock/${p.productId}/2`}>
                    <button style={issueButton}>Issue</button>
                  </Link>
                  <Link to={`/edit-stock/${p.productId}/1`}>
                    <button style={purchaseButton}>Purchase</button>
                  </Link>
                </div>
              </span>
            </div>
          ))
        ) : (
          <div
            style={{
              marginTop: "40px",
              color: "gray",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            No products available.
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <Link to="/ManagerMenu" style={backButton}>
            ← Return
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerProductReport;

