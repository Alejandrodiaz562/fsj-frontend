import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";


const MainLayout = () => {
    
    const categories = ["ramilletes", "ramos", "cajas", "anchetas", "yugos", "funebres"]
    return (
            
        <div className="">
            <Navbar categories={categories}/>
            <div className="">
                <Outlet />
            </div>
            <Footer/>
        </div>
        
     );
}
 
export default MainLayout;