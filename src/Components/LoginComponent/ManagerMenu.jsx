import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const ManagerMenu = () => {
  return (
    <>
      <div style={styles.managerContainer}>
        <Navbar expand="lg" style={styles.managerNavbar}>
          <div style={styles.navInner}>
            <div style={styles.navbarBrand}>Inventory Manager</div>
            <div style={styles.navCenter}>
              <Nav className="mx-auto" style={styles.navLinks}>
                <NavDropdown title="SKU" id="sku-dropdown" style={styles.navDropdown}>
                  <NavDropdown.Item href="/SkuRepo">SKU List</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Product" id="product-nav" style={styles.navDropdown}>
                  <NavDropdown.Item href="/MngProdRepo">Product List</NavDropdown.Item>
                  <NavDropdown.Item href="">Product Analysis</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Transaction" id="transaction-nav" style={styles.navDropdown}>
                  <NavDropdown.Item href="/trans-repo/OUT">
                    Out Transaction Report
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/trans-repo/IN">
                    In Transaction Report
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/ShowSingleUser" style={styles.navLinkBold}>
                  Show User Details
                </Nav.Link>
              </Nav>
            </div>
            <div>
              <Nav.Link href="/" style={styles.logoutLink}>
                Logout
              </Nav.Link>
            </div>
          </div>
        </Navbar>

        <div style={styles.managerContent}>
          <div style={styles.managerHero}>
            <div>
              <h1 style={styles.managerWelcome}>Welcome, Manager!</h1>
              <p style={styles.managerSubtext}>
                Manage your inventory efficiently — monitor SKUs, analyze products,
                track transactions, and access user details. Stay in control with
                your all-in-one Manager Dashboard.
              </p>
            </div>
            <img src="Admin.png" alt="Admin" style={styles.managerImage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerMenu;
const styles = {
  managerContainer: {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    alignItems: "center",
  },
  managerNavbar: {
    backgroundColor: "#22037d", 
    borderRadius: "8px",
    padding: "10px 20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  navInner: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarBrand: {
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: "700",
    marginLeft: "100px",
  },
  navCenter: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  navLinks: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontWeight: 600,
    color: "#ffffff",
  },
  navDropdown: {
    color: "#ffffff",
    fontWeight: 600,
  },
  navLinkBold: {
    fontWeight: 600,
    color: "#ffffff",
    textDecoration: "none",
  },
  logoutLink: {
    color: "#0B5ED7",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    marginRight: "150px",
    padding: "6px 30px",
    borderRadius: "30px",
    textDecoration: "none",
  },
  managerContent: {
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "60px",
  },
  managerHero: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  managerImage: {
    width: "550px",
    height: "auto",
  },
  managerWelcome: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  managerSubtext: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.6",
    marginTop: "15px",
  },
};
