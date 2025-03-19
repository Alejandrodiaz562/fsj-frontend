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
  const [formData, setFormData] = useState({price: '', description: ''})
  const [errorPrice, setErrorPrice] = useState('')
  const [errorDes, setErrorDes] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    if (images.length + selectedFiles.length > 11) {
     
      setButtonText('No se pueden agregar mas fotos')
    }

    if (selectedFiles.length > 12) {
      alert('No puedes seleccionar mas de 12 fotos')

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

  const handlePriceChange = (e) => {
    const {name, value} = e.target
    if (value.length > 6) {
      setErrorPrice('No puede valer mas de un millon de pesos')
    } else {
      setErrorPrice('')
      setFormData({...formData, [name]:value})
    }
  }

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target
    if (value.length > 175) {
      setErrorDes('No se pueden superar los 175 caracteres')
    } else {
      setErrorDes('')
      setFormData({ ...formData, [name]: value });
    }
  }

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    setIsButtonDisabled(images.length > 11);
  }, [images]);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const respuesta = confirm(`seguro que deseas agregar este producto a la categoria ${category}`)

    if (respuesta) {
      setLoading(true)
      const productData = new FormData();
      productData.append('price', formData.price);
      productData.append('description', formData.description);
      productData.append('category', category);
      images.forEach((image, index) => {
        productData.append('photos', image);  // O usa 'photos[]' si el backend espera un array
      });  //

      try {
        const response = await fetch('https://fsj-backend.onrender.com/products', {
          method: 'POST',
          body: productData,})
  
        if (response.ok) {
          alert('Producto agregado correctamente!')
          navigate(`/products/category/${category}`)
        } else {
          throw new Error('No se pudo agregar el producto')
        }
      } catch (err) {
        alert('no se puedo agregar el producto', err)
      } finally {
        setLoading(false)
      }

    } else {
      return
    }
  }

  return ( 
    <div className="w-[100vw] h-[100vh] sm:flex sm:justify-center sm:items-center bg-black">
      <div className="sm:w-[20%] h-[95%] bg-myblue sm:rounded-2xl sm:overflow-hidden">
        <h1 className="text-center text-white py-2">Añade un articulo</h1>
        <form className="w-[100%] h-[100%]" onSubmit={handleSubmit}>
          <div className="w-[100%] h-[40%] flex overflow-x-scroll sm:w-[100%]">
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
          </div>
        
          <div className="w-[100%] h-[60%] text-gray-200 flex flex-col p-3">
            <div className="flex flex-col">
              <input 
              type="number" 
              name="price"
              placeholder="Precio"
              onChange={handlePriceChange}
              required
              value={formData.price}
              className="mb-1"
        
              />
              {errorPrice && <p className="text-red-500">{errorPrice}</p> }
              <textarea 
              type="text" 
              name="description"
              placeholder="Descripción"
              onChange={handleDescriptionChange}
              value={formData.description}
              required
              className="mb-1 resize-y min-h-[120px]"
              
            
            />
            {errorDes && <p className="text-red-500">{errorDes}</p> }
            </div>
            <button type="submit" disabled={loading} className="border pb-1 mt-2       rounded-2xl">
          {loading ? 'Agregando...' : 'Agregar Producto'}
        </button>
          </div>

      </form>
      
      </div>
    </div>
  );
}
 
export default AddProduct;