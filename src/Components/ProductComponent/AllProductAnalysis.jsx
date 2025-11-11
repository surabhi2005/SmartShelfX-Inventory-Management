import React, { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const AllProductAnalysis = () => {
  let navigate = useNavigate();
  const [productSale, setProductSale] = useState([]);

  const setProductSalesData = () => {
    fetch("http://localhost:9898/inventory/analysis")
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).map(([productName, totalSalesValue]) => ({
          productName,
          totalSalesValue,
        }));
        setProductSale(formatted);
      });
  };

  useEffect(() => {
    setProductSalesData();
  }, []);

  const chartData = {
    labels: productSale.map((p) => p.productName),
    datasets: [
      {
        data: productSale.map((p) => p.totalSalesValue),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const returnBack = () => {
    navigate('/AdminMenu');  
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: "30px 40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#0d6efd",
          fontSize: "24px",
          letterSpacing: "1px",
          marginBottom: "25px",
          textDecoration: "underline",
        }}
      >
        Product Sale Dashboard
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "8px",
            overflow: "hidden",
            fontSize: "15px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Product Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Sales Amount</th>
            </tr>
          </thead>
          <tbody>
            {productSale.map((p, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  textAlign: "center",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.productName}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  ₹{p.totalSalesValue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "40px",
          padding: "10px",
        }}
      >
        <h5
          style={{
            color: "#333",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Total Sale per Product
        </h5>
        <div style={{ width: "70%", maxWidth: "350px" }}>
          <Pie data={chartData} />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "35px" }}>
        <button
          onClick={returnBack}
          style={{
            backgroundColor: "#198754",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 30px",
            cursor: "pointer",
            fontSize: "15px",
            letterSpacing: "1px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#157347")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#198754")}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default AllProductAnalysis;
