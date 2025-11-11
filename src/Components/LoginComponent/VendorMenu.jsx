import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const VendorMenu = () => {
  return (
    <div style={styles.adminContainer}>
      <Navbar expand="lg" style={styles.adminNavbar}>
        <div style={styles.navInner}>
          <div style={styles.navbarBrand}>Inventory Vendor Menu</div>
          <div style={styles.navCenter}>
            <Nav style={styles.navLinks}>
              <Nav.Link href="/ShowSingleUser" style={styles.navLinkBold}>
                Show User Details
              </Nav.Link>
            </Nav>
          </div>
          <a href="/" style={styles.logoutLink}>
            Logout
          </a>
        </div>
      </Navbar>

      <div style={styles.adminContent}>
        <div style={styles.adminHero}>
          <div>
            <h1 style={styles.adminWelcome}>
              Welcome, Vendor!
            </h1>
            <p style={styles.adminSubtext}>
              Manage your user details and access key inventory operations efficiently.
            </p>
          </div>
           <img src="Admin.png" alt="Admin" style={styles.adminImage} />
        </div>
      </div>
    </div>
  );
};

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
    fontSize: "32px",
    fontWeight: "700",
    marginLeft: "100px",
  },
  navCenter: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
   adminImage: {
    width: "600px",
    height: "auto",
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
};

export default VendorMenu;
