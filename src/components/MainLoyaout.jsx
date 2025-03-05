import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";


const MainLayout = () => {
    
    const categories = ["ramilletes", "ramos", "cajas", "anchetas", "eventos", "funebres"]
    return (
            
        <div >
            <Navbar categories={categories}/>
            <div className="">
                <Outlet />
            </div>
            <Footer/>
        </div>
        
     );
}
 
export default MainLayout;