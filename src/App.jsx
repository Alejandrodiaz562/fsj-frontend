import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

//PAGES
import PreviewCategories from "./components/PreviewCategories";
import ProductInfo from './pages/ProductInfo'
import AdminLogin from "./pages/AdminLogin";
import HomeCategory from "./pages/HomeCategory";
import MainLayout from "./components/MainLoyaout";
import NotFound from "./pages/Notfound";
import AddProduct from "./pages/AddProduct";

function App() {
  
  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.display = "none";
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<PreviewCategories />} />
          <Route path="/products" element={<PreviewCategories />} />
          <Route path="/products/category/:category" element={<HomeCategory />} />
          
        </Route>
        
        <Route path="/products/:id" element={<ProductInfo />} />

        <Route
          path="/admin"
          element={<Navigate to={"/admin/login"}></Navigate>}>
        </Route>

        <Route path="/admin/login" element={<AdminLogin />}></Route>

        <Route path="/admin/addproduct/:category" element={<AddProduct />}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  )
}

export default App
