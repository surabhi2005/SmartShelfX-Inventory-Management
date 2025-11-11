import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../Services/ProductService";
import { getDemandByProduct } from "../../Services/TransactionService";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
const SingleProductDemand = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Error fetching products."));
  }, []);
  const handleViewDemand = async (productId, productName) => {
    try {
      const response = await getDemandByProduct(productId);
      const data = response.data;

      if (!data || data.length === 0) {
        setError("No demand data available for this product.");
        setChartData(null);
        return;
      }
      const labels = data.map((_, i) => `T${i + 1}`);

      setChartData({
        labels,
        datasets: [
          {
            label: `${productName} - Demand Trend`,
            data,
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54,162,235,0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      });
      setSelectedProduct(productName);
      setError("");
    } catch (e) {
      setError("Error fetching demand data.");
    }
  };

  const returnBack = () => navigate("/AdminMenu");

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Demand Analysis</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Product ID</th>
            <th style={styles.th}>Product Name</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.td}>{p.productId}</td>
              <td style={styles.td}>{p.productName}</td>
              <td style={styles.td}>
                <button
                  style={styles.viewButton}
                  onClick={() => handleViewDemand(p.productId, p.productName)}
                >
                  View Demand
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {chartData && (
        <div style={styles.chartContainer}>
          <h4>{selectedProduct} - Demand Trend</h4>
          <Line data={chartData} />
        </div>
      )}

      <div style={styles.buttonContainer}>
        <button style={styles.backButton} onClick={returnBack}>
          Back
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "850px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#fff",
  },
  viewButton: {
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  chartContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  backButton: {
    backgroundColor: "white",
    color: "#0d6efd",
    border: "1px solid #0d6efd",
    borderRadius: "6px",
    padding: "8px 20px",
    cursor: "pointer",
  },
};

export default SingleProductDemand;
