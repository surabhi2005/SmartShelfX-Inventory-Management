import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../LoginView.css";
import { showAllSKUs, removeSKU } from "../../Services/SKUService";
import { getUserRole } from "../../Services/LoginService";

const SKUReport = () => {
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [skuList, setSkuList] = useState([]);

  const displayAllSKUs = () => {
    showAllSKUs().then((response) => {
      setSkuList(response.data);
    });
  };

  const setUserRole = () => {
    getUserRole().then((response) => {
      setRole(response.data);
    });
  };

  useEffect(() => {
    displayAllSKUs();
    setUserRole();
  }, []);

  const returnBack = () => {
    if (role === "Admin") {
      navigate("/AdminMenu");
    } else if (role === "Manager") {
      navigate("/ManagerMenu");
    }
  };

  const deleteSKU = (id) => {
    removeSKU(id).then((res) => {
      let remainSkus = skuList.filter((sku) => sku.skuId !== id);
      setSkuList(remainSkus);
    });
    navigate("/SkuRepo");
  };

  return (
    <div className="text-center">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          cursor: "pointer",
          margin: "20px",
          marginLeft: "50px",
          fontWeight: "bold",
        }}
      >
        <button
          onClick={returnBack}
          className="btn btn-success"
          style={{ width: "100px", fontWeight: "bold" }}
        >
          Back
        </button>
      </div>

      <h2 className="text-center" style={{ letterSpacing: "2px" }}>
        SKU List
      </h2>
      <hr
        style={{
          height: "3px",
          borderWidth: 0,
          color: "yellow",
          backgroundColor: "red",
          width: "60%",
          margin: "10px auto",
        }}
      />

      <div className="container" style={{ padding: "30px", maxWidth: "900px" }}>
        <div
          className="sku-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 50px",
            fontWeight: "bolder",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "20%" }}>SKU ID</span>
          <span style={{ width: "70%" }}>DESCRIPTION</span>
          <span style={{ width: "10%" }}>ACTIONS</span>
        </div>

        {skuList.map((sku) => (
          <div
            key={sku.skuId}
            className="sku-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 50px",
              boxShadow: "0 4px 8px rgba(54, 54, 54, 0.1)",
              borderRadius: "12px",
              marginBottom: "15px",
              backgroundColor: "rgba(242, 242, 242, 0.7)",
              boxSizing: "border-box",
            }}
          >
            <span style={{ width: "20%", fontWeight: "500" }}>
              {sku.skuId}
            </span>
            <span style={{ width: "70%", fontWeight: "500" }}>
              {sku.skuDescription}
            </span>
            <span
              style={{
                width: "10%",
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Link to={`/update-sku/${sku.skuId}`}>
                <button
                  className="btn btn-info"
                  style={{ width: "80px", fontWeight: "bold" }}
                >
                  Update
                </button>
              </Link>
              <button
                onClick={() => deleteSKU(sku.skuId)}
                className="btn btn-danger"
                style={{ width: "80px", fontWeight: "bold" }}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SKUReport;

