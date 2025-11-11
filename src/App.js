import {BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import ManagerMenu from "./Components/LoginComponent/ManagerMenu";
import './App.css';
import VendorMenu from "./Components/LoginComponent/VendorMenu";
import ShowSingleUser from "./Components/LoginComponent/ShowSingleUser";
import SKUAddition from "./Components/SKUComponent/SKUAddition";
import SKUReport from "./Components/SKUComponent/SKUReport";
import SKUUpdate from "./Components/SKUComponent/SKUUpdate";
import ViewProduct from "./Components/ProductComponent/ViewProduct";
import ProductAddition from "./Components/ProductComponent/ProductAddition";
import AdminProductReport from "./Components/ProductComponent/AdminProductReport";
import ManagerProductReport from "./Components/ProductComponent/ManagerProductReport";
import EditProductPrice from "./Components/ProductComponent/EditProductPrice";
import EditStock from "./Components/ProductComponent/EditStock";
import TransactionReport from "./Components/ProductComponent/TransactionReport";
import AllProductAnalysis from "./Components/ProductComponent/AllProductAnalysis";
import SingleProductDemand from "./Components/ProductComponent/SingleProductDemand";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path="/AdminMenu" element={<AdminMenu/>}/>
        <Route path="/ManagerMenu" element={<ManagerMenu/>}/>
        <Route path="/VendorMenu" element={<VendorMenu/>}/>
        <Route path="/ShowSingleUser" element={<ShowSingleUser/>}/>
        <Route path="/SkuAdd" element={<SKUAddition/>}/>
        <Route path="/SkuRepo" element={<SKUReport/>}/>
       <Route path="/update-sku/:id" element={<SKUUpdate/>}/>
       <Route path="/ProductAdd" element={<ProductAddition/>}/>
       <Route path="/AdProdRepo" element={<AdminProductReport/>}/>
       <Route path="/MngProdRepo" element={<ManagerProductReport/>}/>
       <Route path="/edit-price/:pid" element={<EditProductPrice/>}/>
       <Route path="/edit-stock/:pid/:flag" element={<EditStock/>}/>
       <Route path= "/view-product/:pid" element={<ViewProduct/>}/>
       <Route path="/trans-repo/:pid" element={<TransactionReport/>}/>
       <Route path="/all-products" element={<AllProductAnalysis/>}/>
       <Route path="/single-product-demand" element={<SingleProductDemand/>}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
