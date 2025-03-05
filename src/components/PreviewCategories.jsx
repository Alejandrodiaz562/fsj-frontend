import { useState, useEffect } from 'react'
import PreviewCategory from './PreviewCategory';

const PreviewCategories = () => {
    const [data, setData] = useState(null)
    
    
      useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch("https://fsj-backend.onrender.com/products");
              const data = await response.json();
              setData(data);
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

        const [categories, setCategories] = useState(["ramilletes", "ramos", "cajas", "anchetas", "yugos", "funebres"])
        
        const bg = 'bg-[linear-gradient(90deg,#c8a25d,#f7e199,#fff4d1,#f7e199,#c8a25d)] min-h-[60vh]'

    return ( 
      <div className={`${bg} flex flex-col items-center`}>
      {categories.map((el)=> (
        <PreviewCategory category={el} key={el} data={data} convert={convert}></PreviewCategory>
      ))}
    </div>
     );
}
 
export default PreviewCategories;