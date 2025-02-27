import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {

    const [data, setData] = useState(null)
        
        
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://fsj-backend.onrender.com/products");
            const data = await response.json();
            setData(data);
           console.log(data)
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

    const { id } = useParams();
    const [imagesUrl, setImagesUrl] = useState([])
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(()=> {
        const product = data?.find((product)=> product.id === id)

        if(product){
            setImagesUrl(product.images)
            setDescription(product.description)
            setPrice(product.price)
        }
    },[id, data])

    console.log(imagesUrl)

    if (imagesUrl.length === 0) {
        return <h1>loading...</h1>; // Mostrar un mensaje mientras cargas la imagen
    }

    return ( 
        <div className='bg-myblue w-[100vw] h-[100vh] sm:flex sm:items-center sm:justify-center'>
            <div className='bg-myblue w-[100%] h-[100%] sm:flex sm:h-[80%] sm:w-[70%]'>
                <div className='h-[50%] w-[100%] flex gap-1.5 overflow-x-scroll sm:h-[100%] sm:w-auto'>
                    {
                      imagesUrl.map((image, index)=>(
                        <img src={imagesUrl[index]} className='h-[100%] min-w-full object-cover' key={index} alt="" />
                      ))
                    }
                </div>
                <div className='w-[100%] h-[50%]  text-white p-7 sm:h-[100%]'>
                  <div className='h-[15%]'>
                    <p className=' text-3xl'>{convert(price)}</p>
                  </div>
                  <div className='h-[85%] overflow-y-scroll'>
                    <p className='text-2xl text-gray-400'>{description}</p>
                  </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductInfo;