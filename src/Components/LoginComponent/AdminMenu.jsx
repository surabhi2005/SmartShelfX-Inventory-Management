import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminMenu = () => {
  return (
    <div style={styles.adminContainer}>
      <Navbar expand="lg" style={styles.adminNavbar}>
        <div style={styles.navInner}>
          <div style={styles.navbarBrand}>SmartShelfX</div>
          <div style={styles.navCenter}>
            <Nav className="mx-auto" style={styles.navLinks}>
              <NavDropdown title="SKU" id="sku-dropdown" style={styles.navDropdown}>
                <NavDropdown.Item href="/SkuRepo">SKU List</NavDropdown.Item>
                <NavDropdown.Item href="/SkuAdd">SKU Addition</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Product" id="product-nav" menuVariant="light">
              <NavDropdown.Item href="/ProductAdd">Product Addition</NavDropdown.Item>
              <NavDropdown.Item href="/AdProdRepo">Product List</NavDropdown.Item>
                <NavDropdown title="Product Analysis" id="product-analysis-nav" menuVariant="light">
                 <NavDropdown.Item href="/all-products">All Products Sale</NavDropdown.Item>
                   <NavDropdown.Item href="/single-product-demand">Single Product Demand</NavDropdown.Item>
                </NavDropdown>
            </NavDropdown>


              <NavDropdown title="Stock" id="stock-dropdown" style={styles.navDropdown}>
                <NavDropdown.Item href="">Stock Issue</NavDropdown.Item>
                <NavDropdown.Item href="">Stock Purchase</NavDropdown.Item>
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

      <div style={styles.adminContent}>
        <div style={styles.adminHero}>
          <div>
            <h1 style={styles.adminWelcome}>Welcome, Admin!</h1>
            <p style={styles.adminSubtext}>
              You're now in control of SmartShelfX — your centralized hub for managing SKUs,
              products, and stock with precision. Navigate through the menu to track inventory,
              analyze trends, and optimize operations.
            </p>
          </div>
          <img src="Admin.png" alt="Admin" style={styles.adminImage} />
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

const styles = {
  adminContainer: {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f9f9fc",
    alignItems: "center",
  },
  adminNavbar: {
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
    fontSize: "36px",
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
  logoutLink: {
    color: "#22037d",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    marginRight: "150px",
    padding: "6px 30px",
    borderRadius: "30px",
    textDecoration: "none",
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
  adminContent: {
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "60px",
  },
  adminHero: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  adminImage: {
    width: "600px",
    height: "auto",
  },
  adminWelcome: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  adminSubtext: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.6",
    marginTop: "15px",
  },
  dropdownSubmenu: {
    position: "relative",
  },
  submenuToggle: {
    cursor: "pointer",
    fontWeight: 500,
    color: "#333",
  },
  submenu: {
    display: "none",
    position: "absolute",
    top: 0,
    left: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    zIndex: 1000,
    minWidth: "180px",
    padding: "5px",
    borderRadius: "5px",
  },
};
