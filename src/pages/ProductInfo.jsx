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
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(()=> {
        const product = data?.find((product)=> product.id === id)

        if(product){
            setImageUrl(product.images[0])
            setDescription(product.description)
            setPrice(product.price)
        }
    },[id, data])

    if (!imageUrl) {
        return <h1>Loading...</h1>; // Mostrar un mensaje mientras cargas la imagen
    }

    return ( 
        <div className='bg-mygold w-[100vw] h-[100vh]'>
            <div className='bg-myblue w-[100%] h-[100%]'>
                <div className='h-[70%] w-[100%]'>
                    <img src={imageUrl} alt="" className='h-[100%] w-[100%] object-cover'  />
                </div>
            </div>
        </div>
     );
}
 
export default ProductInfo;