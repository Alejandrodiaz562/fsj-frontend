import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const {category} = useParams()
  const fileInputRef = useRef(null)
  const fileInputRefsImages = useRef([])
  const buttonRef = useRef(null); // Referencia al botón
  const [images, setImages] = useState([])
  const [errorImage, setErrorImage] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    if (images.length + selectedFiles.length > 12) {
      setErrorImage("Numero maximo de imagenes superado!!! (12)");
      setIsButtonDisabled(true); // Deshabilita el botón
      return;
    }

    setErrorImage(""); // Limpia el error si todo está bien
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
    setIsButtonDisabled(images.length >= 12);
  }, [images]);
  

  return ( 
    <div>
      <h1>Añade un articulo</h1>
      <form className="bg-red-400 w-[100vw] h-[40vh] flex overflow-x-scroll">
      {
          images.length > 0 && images.map((image, index)=>(
            <div className="w-[80vw] h-[100%] flex-shrink-0" key={index}>
              <img
                src={URL.createObjectURL(image)}
                className="w-[100%] h-[100%] object-cover"
                onClick={() => fileInputRefsImages.current[index]?.click()}
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
        <button
          type="button"
          disabled={isButtonDisabled}
          ref={buttonRef}
          className={`bg-gray-600 text-amber-50 w-[80vw] h-[100%] flex-shrink-0 ${isButtonDisabled ? 'hidden' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          + Añadir fotos
        </button>
        <input 
          type="file"
          accept=".jpg"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
       
        
        
      </form>
      <p className="text-red-600">{errorImage ? errorImage : ''}</p>
    </div>
  );
}
 
export default AddProduct;