import React, { useEffect, useState } from 'react';
import { getProductById, stockUpdate } from '../../Services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleUserDetails } from '../../Services/LoginService';
import { generateId, saveTransaction } from '../../Services/TransactionService';

const EditStock = () => {
  const [newId, setNewId] = useState(0);
  const param = useParams();
  const [qty, setQty] = useState(0.0);
  const [flag, setFlag] = useState(0);
  const [mdate, setMdate] = useState(new Date().toISOString().split("T")[0]);
  let navigate = useNavigate();
  const [transValue, setTransValue] = useState(null);
  const [error, setError] = useState(null);
  const [iUser, setIUser] = useState({
    username: "",
    personalName: "",
    password: "",
    email: "",
    role: "",
  });

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

  const [transaction, setTransaction] = useState({
    transactionId: "",
    transactionType: "",
    productId: "",
    rate: 0.0,
    quantity: 0.0,
    transactionValue: 0.0,
    userId: "",
    transactionDate: new Date(),
  });

  const setProductData = () => {
    getProductById(param.pid).then((response) => {
      setProduct(response.data);
      setFlag(param.flag);
    });
  };

  const setUserData = () => {
    getSingleUserDetails().then((response) => {
      setIUser(response.data);
    });
  };

  const setTransactionId = () => {
    generateId().then((response) => {
      setNewId(response.data);
      setTransaction((prev) => ({ ...prev, transactionId: response.data }));
    });
  };

  useEffect(() => {
    setProductData();
    setUserData();
    setTransactionId();
  }, []);

  const returnBack = () => {
    if (iUser.role === "Admin") navigate("/AdProdRepo");
    else if (iUser.role === "Manager") navigate("/MngProdRepo");
  };

  const handleQtyChange = (event) => {
    const input = event.target.value;
    setQty(input);
    if (input === "" || input === null) {
      setError("Quantity is required");
      return;
    }
    const value = parseFloat(event.target.value);

    if (value === 0) setError("Quantity cannot be zero");
    else if (value < 0) setError("Quantity cannot be negative");
    else setError(null);
  };

  const handleTransactionChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const stockEdit = (event) => {
    event.preventDefault();
    const flagInt = parseInt(flag);
    const qtyValue = parseFloat(qty);

    let transactionType = "";
    let rate = 0.0;

    if (flagInt === 1) {
      transactionType = "IN";
      rate = product.purchasePrice;
    } else if (flagInt === 2) {
      transactionType = "OUT";
      rate = product.salesPrice;
    }

    const transactionValue = rate * qtyValue;
    setTransValue(transactionValue);

    const newTransaction = {
      transactionId: transaction.transactionId || newId,
      transactionType,
      productId: product.productId,
      rate: parseFloat(rate),
      quantity: qtyValue,
      transactionValue,
      userId: iUser.username,
      transactionDate: mdate,
    };

    stockUpdate(product, qtyValue, flag)
      .then(() => {
        alert("Stock Updated Successfully");
        saveTransaction(newTransaction)
          .then(() => {
            alert("Transaction Saved Successfully");
            returnBack();
          })
          .catch((err) => console.error("Error saving transaction:", err));
      })
      .catch((err) => console.error("Error updating stock:", err));
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
          width: "600px",
          padding: "25px 30px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <h3 style={{ letterSpacing: "2px", textAlign: "center", marginBottom: "15px" }}>
          {parseInt(flag) === 1 ? "Product Purchase" : "Product Issue"}
        </h3>

        <table
          className="table table-sm table-bordered"
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
          }}
        >
          <tbody>
            <tr><td><b>ID:</b></td><td>{product.productId}</td></tr>
            <tr><td><b>SKU:</b></td><td>{product.sku}</td></tr>
            <tr><td><b>Name:</b></td><td>{product.productName}</td></tr>
            <tr>
              <td><b>{parseInt(flag) === 1 ? "Purchase Price:" : "Sales Price:"}</b></td>
              <td>{parseInt(flag) === 1 ? product.purchasePrice : product.salesPrice}</td>
            </tr>
            <tr><td><b>Reorder:</b></td><td>{product.reorderLevel}</td></tr>
            <tr><td><b>Stock:</b></td><td>{product.stock}</td></tr>
            <tr><td><b>Vendor:</b></td><td>{product.vendorId}</td></tr>
            <tr>
              <td><b>Status:</b></td>
              <td style={{ color: product.status ? "green" : "red" }}>
                {product.status ? "Permitted" : "Reorder Level Reached"}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="form-group mb-2">
          <label><b>Transaction ID:</b></label>
          <input
            type="text"
            name="transactionId"
            className="form-control"
            value={newId}
            onChange={handleTransactionChange}
            style={{ height: "32px", fontSize: "16px" }}
          />
        </div>

        <div className="form-group mb-2">
          <label><b>Date:</b></label>
          <input
            type="date"
            className="form-control"
            value={mdate}
            onChange={(e) => setMdate(e.target.value)}
            style={{ height: "32px", fontSize: "16px" }}
          />
        </div>

        <div className="form-group mb-2">
          <b>
            {parseInt(flag) === 1
              ? "Enter Purchased Quantity:"
              : "Enter Issued Quantity:"}
          </b>
          <input
            placeholder="Enter quantity"
            name="qty"
            className="form-control"
            value={qty}
            onChange={handleQtyChange}
            style={{ height: "32px", fontSize: "16px" }}
          />
          {error && (
            <p style={{ color: "red", marginTop: "3px", fontSize: "16px" }}>{error}</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <button
            className="btn btn-outline-primary"
            onClick={returnBack}
            style={{
              width: "140px",
              padding: "6px 0",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            CANCEL
          </button>
          <button
            className="btn btn-primary"
            onClick={stockEdit}
            disabled={error !== null || qty === "" || qty === 0}
            style={{
              width: "140px",
              padding: "6px 0",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            UPDATE
          </button>
        </div>

        {transValue !== null && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <h6 style={{ color: "blue", fontSize: "15px" }}>
              Transaction Value: ₹{transValue}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStock;
