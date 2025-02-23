import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RenderProduct from './RenderProduct';

const PreviewCategory = ({category, data, convert}) => {

    const [products, setProducts] = useState([])
    const [isGreaterThanFour, setIsGreaterThanFour] = useState(false)
    
    useEffect(()=> {
        if (data){
            
          const filterProducts = data.filter((product) => product.category === category)
          
          setProducts(filterProducts)
          
        }

        

    }, [data, category])

    useEffect(() => {
        setIsGreaterThanFour(products.length >= 4);
    }, [products]);


    return ( 
        
        <div className='p-1 w-[80%] my-2'>
            <div>
                <h2 className='my-2 text-4xl p-0 flex items-center justify-center'>{category.toUpperCase()}</h2>
            </div>

            <div>
                {
                    products.length > 0 ? (
                        <div className='grid grid-cols-2 gap-5 sm:grid-cols-4'>
                            {
                                products.slice(0, 4).map((product) => (
                                   
                                    <RenderProduct
                                        key={product.id}
                                        id={product.id}
                                        image={product.images[0]}
                                        price={convert(product.price)}
                                       
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <div className=' py-4 px-8 flex items-center justify-center'>
                            <p>No hay {category} para mostrar</p>
                        </div>
                    )
                }
            </div>
            
            {
                isGreaterThanFour && (
                    <div className='mt-6 flex justify-center'>
                        <Link to={`/products/category/${category}`}>
                            <button className='border-1 border-black py-2 px-6 rounded-xs text-black'>Quiero ver mas productos</button>
                        </Link>
                    </div>
                )
            }
        </div>
     );
}
 
export default PreviewCategory;

