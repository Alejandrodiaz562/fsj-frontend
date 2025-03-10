import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const {category} = useParams()
    const [formData, setFormData] = useState({
        price: '',
        description: '',
      });

      const [images, setImages] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('')
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.length > 175) {
          setError('No se pueden superar los 175 caracteres')
        } else {
          setError('')
          setFormData({ ...formData, [name]: value });
        }
        
      };
      
      const handleImageChange = (e) => {
        // Convertir FileList a Array para poder manipularlo fácilmente
        setImages(Array.from(e.target.files));
      };

      const handleSubmit = async (e) => {

        const respuesta = confirm(`seguro que deseas agregar este producto a la categoria ${category}`)

        if (respuesta) {
          e.preventDefault();
        setLoading(true);
    
        const productData = new FormData();
       
        productData.append('price', formData.price);
        productData.append('description', formData.description);
        productData.append('category', category);
        images.forEach((image, index) => {
          productData.append('photos', image);  // O usa 'photos[]' si el backend espera un array
        });  // Aquí aseguramos que el nombre coincida con el backend
    
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
          console.error('Error al agregar el producto', err)
          alert('no se puedo agregar el producto')
        } finally {
          setLoading(false)
        }
        } else {
          return
        }
        
    
        }

    return ( 
        <div className="h-[100vh] w-[100vw] bg-myblue  text-white">
            <form onSubmit={handleSubmit}>
                <h2>Añade un articulo</h2>
                <div>
                    <img src={images[0]} alt="" />
                </div>
                <div>
                    <input
                        type="file"
                        accept=".jpg"
                        onChange={handleImageChange}
                        required
                        multiple
                    />
                </div>
                <input
              name="price"
              type="number"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <input
              name="description"
              type="text"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Producto'}
        </button>
            </form>
        </div>
     );
}
 
export default AddProduct;