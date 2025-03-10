import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";


import RenderProduct from '../components/RenderProduct'
import SkeletonProduct from '../components/SkeletonProduct';


const HomeCategory = ({data, convert}) => {
    
    const {category} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null);

    useEffect(() => {
      setLoading(!data);
    }, [data]);
   
      useEffect(()=>{
        if (data) {
          const filterProducts = data.filter((product) => product.category === category)

          setProducts(filterProducts)
          setLoading(false)
        }
      }, [data, category])

      useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
          setUser(user)
        })

        return () => unsubscribe()
      }, [])

    return ( 
        <div className="bg-[linear-gradient(90deg,#c8a25d,#f7e199,#fff4d1,#f7e199,#c8a25d)] min-h-[60vh] flex flex-col justify-start items-center py-5">
          {user && user.email === "alejodv562@gmail.com" && (
               
                  <Link to={`/admin/addproduct/${category}`}>
                    <button className="text-black px-4 py-2 border mb-5 cursor-pointer">
                        Agregar Producto
                    </button>
                  </Link>
                
          )}
          
          <div className='max-w-[95vw] w-[95vw] grid grid-cols-3 gap-5 sm:grid-cols-6'>
         
            {
              loading ? (
                <>  
                  
                  {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonProduct key={index} />
                  ))}
                </>
                
            
              ): products.length > 0 ? (
                <>
                  {
                    products.map((product)=>(
                      <RenderProduct key={product.id} id={product.id} image={product.images[0]} price={convert(product.price)}></RenderProduct>
                    ))
                  }
                </>
                
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