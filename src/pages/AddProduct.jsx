import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const {category} = useParams()
  const fileInputRef = useRef(null)
  const fileInputRefsImages = useRef([])
  const buttonRef = useRef(null); // Referencia al botón
  const [buttonText, setButtonText] = useState('+ Agregar fotos')
  const [images, setImages] = useState([])
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    if (images.length + selectedFiles.length > 11) {
     
      setButtonText('No se pueden agregar mas fotos')
    }

    if (selectedFiles.length > 12) {
      alert('No puedes agregar mas de 12 fotos')

      setButtonText('+ Agregar fotos')
      return
    }
  
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  }

  const handleReplaceImage = (e, index) => {
    const selectedFile = e.target.files[0]
   
    setImages((prevImages) => {
      const updatedImages = [...prevImages]; // Clonamos el array
      updatedImages[index] = selectedFile
      return updatedImages
    }) 
  }

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    setIsButtonDisabled(images.length > 11);
  }, [images]);
  

  return ( 
    <div className="w-[100vw] h-[100vh] sm:flex sm:justify-center sm:items-center bg-black">
      <div className="sm:w-[20%] sm:h-[95%] bg-myblue rounded-2xl">
      <h1 className="text-center text-white py-2">Añade un articulo</h1>
      <form className="w-[100vw] h-[40vh] flex overflow-x-scroll sm:w-[100%]">
      {
          images.length > 0 && images.map((image, index)=>(
            <div className="w-[80%] h-[100%] flex-shrink-0 p-1" key={index}>
              <img
                src={URL.createObjectURL(image)}
                className="w-[100%] h-[100%] object-cover rounded-xl"
                onClick={() => {
                  const respuesta = confirm('Deseas editar la imagen?')

                  if(respuesta){
                    fileInputRefsImages.current[index]?.click()
                  } else {
                    const respuesta2 = confirm('La deseas eliminar')
                    if (respuesta2){
                     const newImages = images.filter(el => el !== image)
                     setImages(newImages)
                     setButtonText('+ Agregar fotos')
                    } else{
                      return
                    }
                  }
                }}
              >
              </img>
              <input
                type="file"
                accept=".jpg"
                ref={(el) => fileInputRefsImages.current[index] = el}
                onChange={(e) => handleReplaceImage(e, index)}
                className="hidden"

              />
             
            </div>
            
          ))
        }
        <div className={`w-[80vw] h-[100%] sm:w-[80%] flex-shrink-0 p-1 mr-1${isButtonDisabled ? 'hidden' : ''}`}>
        <button
          type="button"
          disabled={isButtonDisabled}
          ref={buttonRef}
          className='bg-gray-600 text-amber-50 w-[100%] h-[100%] rounded-2xl'
          onClick={() => fileInputRef.current.click()}
        >
          {buttonText}
        </button>
        <input 
          type="file"
          accept=".jpg"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        </div>
       
        
        
      </form>
      
      </div>
    </div>
  );
}
 
export default AddProduct;