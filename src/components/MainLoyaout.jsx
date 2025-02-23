import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";


const MainLayout = () => {
    
    const categories = ["buquets", "ramos", "cajas", "anchetas", "yugos", "funebres"]
    return (
            
        <div className="">
            <Navbar categories={categories}/>
            <Outlet/>
            <Footer/>
        </div>
        
     );
}
 
export default MainLayout;