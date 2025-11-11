import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { findTransactionsByType } from '../../Services/TransactionService';
import { getUserRole } from '../../Services/LoginService';

const TransactionReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [flag, setFlag] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getUserRole().then((response) => setRole(response.data));
    findTransactionsByType(param.pid).then((response) => {
      setTransactions(response.data);
      setFlag(param.pid);
    });
  }, [param.pid]);

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/AdminMenu');
    else if (role === 'Manager')
      navigate('/ManagerMenu');
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafc",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <h3 style={{
        color: "#0d6efd",
        textAlign: "center",
        letterSpacing: "2px",
        textDecoration: "underline",
        marginBottom: "30px"
      }}>
        {flag === "IN" ? "Purchase Report" : "Issue Report"}
      </h3>

      <table style={{
        borderCollapse: "collapse",
        width: "85%",
        maxWidth: "1000px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        fontSize: "15px"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#0d6efd", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Transaction Id</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Product Id</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Rate</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Quantity</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Transaction Value</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>User Id</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Transaction Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, index) => (
            <tr
              key={t.transactionId}
              style={{
                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                textAlign: "center"
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.transactionId}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.productId}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.rate}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.quantity}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.transactionValue}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.userId}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{t.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={returnBack}
        style={{
          marginTop: "30px",
          padding: "10px 30px",
          backgroundColor: "#0d6efd",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          letterSpacing: "1px",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0b5ed7"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
      >
        Return
      </button>
    </div>
  );
};

export default TransactionReport;
