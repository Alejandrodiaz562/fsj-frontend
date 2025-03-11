import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

//PAGES
import PreviewCategories from "./components/PreviewCategories";
import ProductInfo from './pages/ProductInfo'
import AdminLogin from "./pages/AdminLogin";
import HomeCategory from "./pages/HomeCategory";
import MainLayout from "./components/MainLoyaout";
import NotFound from "./pages/Notfound";
import AddProduct from "./pages/AddProduct";

function App() {

  const [data, setData] = useState(null)
  
  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.display = "none";
    }
  }, []);

  
    
    
      useEffect(() => {
          const fetchData = async () => {
            try {
              console.log("Iniciando fetch..."); // <-- Verifica que el useEffect se ejecuta
              const response = await fetch("https://fsj-backend.onrender.com/products");

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              
              setData(data);
            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };
        
          fetchData();
        }, []);

        const convert = (value)=> {
            const formatoCOP = new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(value);
        
            return formatoCOP
          }
  
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Navigate to={'/products'}></Navigate>}/>
          <Route path="/products" element={<PreviewCategories data={data} convert={convert} />} />
          <Route path="/products/category/:category" element={<HomeCategory data={data} convert={convert}/>} />
        </Route>
        
        <Route path="/products/:id" element={<ProductInfo data={data} convert={convert}/>} />

        <Route
          path="/products/admin"
          element={<Navigate to={"/products/admin/login"}></Navigate>}>
        </Route>

        <Route path="/products/admin/login" element={<AdminLogin />}></Route>

        <Route path="/admin/addproduct/:category" element={<AddProduct />}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  )
}

export default App
