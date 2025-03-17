import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import entradaFlori from '../img/entradaflori.jpg'
const ProductInfo = ({data, convert}) => {

    

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

    

    /*if (imagesUrl.length === 0) {
        return (
          <div className="fixed inset-0 bg-myblue flex items-center justify-center z-50">
      
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-4"></div>
            <p className="text-white text-4xl">Cargando...</p>
          </div>
        ) // Mostrar un mensaje mientras cargas la imagen
    }*/

    return ( 
        <div className='bg-black w-[100vw] h-[100vh] sm:overflow-y-hidden sm:flex sm:items-center sm:justify-center'>
            <div className='bg-myblue w-[100%] h-[100%] sm:w-[20%] sm:h-[95%] rounded-xl sm:overflow-hidden'>
                <div className='h-[50%] w-[100%] flex gap-1.5 overflow-x-scroll sm:h-[55%] sm:min-w-[50%]'>
                    {
                      imagesUrl.map((image, index)=>(
                        <img src={imagesUrl[index]} className='h-[100%] min-w-full object-cover' key={index} alt="" />
                      ))
                    }
                </div>
                <div className='w-[100%] h-[50%]  text-white p-2 sm:p-4 sm:h-[100%]'>
                  <div className='h-[15%] sm:h-[8%]'>
                    <p className=' text-2xl'>{convert(price)}</p>
                  </div>
                  <div className='h-[85%]'>
                    <p className='text-xl text-gray-400'>{description}</p>
                  </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductInfo;