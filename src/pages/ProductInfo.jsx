import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import eliminar from '../img/eliminar.png'
import editar from '../img/boton-editar.png'


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const ProductInfo = ({data, convert}) => {

    

    const { id } = useParams();
    const [imagesUrl, setImagesUrl] = useState([])
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const product = data?.find((product)=> product.id === id)

        if(product){
            setImagesUrl(product.images)
            setDescription(product.description)
            setPrice(product.price)
        }
    },[id, data])

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user)=>{
        console.log("Usuario autenticado:", user); 
        setUser(user)
      })

      return () => unsubscribe()
    }, [])


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
                <div className='w-[100%] h-[50%]  text-white p-4 sm:p-3 sm:h-[100%]'>
                  <div className='h-[10%] sm:h-[6%]'>
                    <p className='text-2xl sm:text-xl'>{convert(price)}</p>
                  </div>
                  <div className='h-[60%] sm:h-[25%]'>
                    <p className='text-2xl sm:text-base  text-gray-400 break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, dolores, distinctio dolorum iste exercitationem recusandae eligendi commodi quasi fuga fugit aliquid incidunt tempora ipsam aperiam eum</p>
                  </div>
                  <div>
                  {user && user.email === "alejodv562@gmail.com" && (
                    <div className="h-[100px] flex justify-end items-end ">
                      <button className="bg-white px-4 py-2 border   cursor-pointer rounded-xl mr-5">
                        <img className="h-[40px]" src={editar} alt="" />
                      </button>
                      <button className="bg-white px-4 py-2 border   cursor-pointer rounded-xl">
                        <img className="h-[40px]" src={eliminar} alt="" />
                      </button>

                    </div>
                  )}
                  </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductInfo;