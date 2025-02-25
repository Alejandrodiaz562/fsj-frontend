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
            <div className='bg-myblue w-[100%] h-[100%] overflow-y-scroll'>
                <div className='h-[50%] w-[100%] p-7'>
                    <img src={imageUrl} alt="" className='h-[100%] w-[100%] object-cover rounded-2xl'  />
                </div>
                <div className='w-[100%] h-[50%] text-white p-7 '>
                  <div >
                    <p className=' text-4xl'>{convert(price)}</p>
                  </div>
                  <div className='py-5'>
                    <p className='text-2xl text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit vel aliquam voluptas ut, sint ratione ullam temporibus quo vero distinctio nostrum molestias aut sit perspiciatis qui quas deserunt ducimus quibusdam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores doloremque illo aut maiores assumenda minima quisquam, reprehenderit aliquid, mollitia impedit esse dicta voluptatibus culpa ut, corporis quia harum ipsum officia.{description}</p>
                  </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductInfo;