import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";


import RenderProduct from '../components/RenderProduct'
import SkeletonProduct from '../components/SkeletonProduct';


const HomeCategory = () => {
    
    const {category} = useParams()
    const [data, setData] = useState(null)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null);
   
    
      useEffect(() => {
          const fetchData = async () => {
            try {
              setIsLoading(true)
              const response = await fetch("https://fsj-backend.onrender.com/products");
              const data = await response.json();
              setData(data);
            } catch (err) {
              setIsLoading(false)
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

      useEffect(()=>{
        if (data) {
          const filterProducts = data.filter((product) => product.category === category)

          setProducts(filterProducts)
          setIsLoading(false)
        }
      }, [data, category])

      useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
          setUser(user)
        })

        return () => unsubscribe()
      }, [])

    return ( 
        <div className="bg-[linear-gradient(90deg,#c8a25d,#f7e199,#fff4d1,#f7e199,#c8a25d)] min-h-[60vh] flex flex-col justify-center items-center">
          {user && user.email === "alejodv562@gmail.com" && (
                <div className="mb-4 flex justify-end">
                  <Link to={`/admin/addproduct/${category}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Agregar Producto
                    </button>
                  </Link>
                    
                </div>
          )}

          <div>
            {
              isLoading ? (
                <div className='max-w-[95vw] w-[95vw] grid grid-cols-3 gap-5 sm:grid-cols-6 border'>
                {Array.from({ length: 9 }).map((_, index) => (
                    <SkeletonProduct key={index} />
                ))}
            </div>
              ): products.length > 0 ? (
                <div className='max-w-[95vw] grid grid-cols-3 sm:grid-cols-6 gap-5 my-6'>
                  {
                    products.map((product)=>(
                      <RenderProduct key={product.id} id={product.id} image={product.images[0]} price={convert(product.price)}></RenderProduct>
                    ))
                  }
                </div>
              ) : (
                <div className='p-6'>
                  <h1 className='text-4xl'>No hay productos para mostrar de la categoria {category}</h1>
                </div>
              )
            }
          </div>

          
            
            
         
        </div>
        
     );
}
 
export default HomeCategory;