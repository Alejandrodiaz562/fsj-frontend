import logo from '../img/fsj-logo.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Íconos de hamburguesa y cierre

const NavBar = ({categories}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const menuOpenClasses = 'shadow-[2px_5px_500px_5px_black] border-l-1 border-white bg-myblue pt-20 fixed  right-0  top-0 w-[65%] h-[100%] flex flex-col items-center transition-transform duration-800 ease-in-out sm:left-[-380px]'

    const menuCloseClasses = 'border-l-1 border-white bg-myblue pt-20 fixed right-0 top-0 w-[65%] h-[100%] flex flex-col items-center translate-x-[300px] transition-transform duration-800 ease-in-out sm:left-[-590px]'

    const desktopClasses = 'sm:flex sm:flex-row sm:bg-transparent sm:relative sm:top-auto sm:right-auto'

    return ( 
        <nav className= "bg-myblue text-white h-[10vh]  flex justify-between items-center px-[5%] sticky top-0 z-[50]" >
            
            <Link to={'/products'} className='h-[80%]' >
                <img src={logo} alt="" className='h-[100%]'/>
            </Link>
           

            <button className='sm:hidden h-[40%] aspect-square flex items-center justify-center' onClick={toggleMenu}>
                <FaBars className='w-[100%] h-[100%]'/>
            </button>

            <ul className={`${isOpen ? menuOpenClasses : menuCloseClasses } ${desktopClasses}`}>
                <button  className={`${isOpen ? 'sm:hidden h-[5%] aspect-square flex items-center justify-center absolute top-3 left-3' : 'sm:hidden h-[5%] aspect-square flex items-center justify-center absolute top-3 left-3'}`} onClick={toggleMenu}>
                    <FaTimes className='w-[100%] h-[100%]'/>
                </button>
                {categories.map((el)=> (
                    <li key={el} className={`${isOpen ? 'my-5 mx-5' : 'my-5 mx-5'} text-xl px-4 py-1 sm:px-2 sm:mx-2`}>
                        <Link to={`products/category/${el}`} onClick={()=> {
                             if (window.innerWidth < 640) { 
                                toggleMenu();
                             }
                        }} >{el.toUpperCase()}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
 
export default NavBar;