import { useState, useEffect } from 'react'
import PreviewCategory from './PreviewCategory';
import SkeletonProduct from './SkeletonProduct';


const PreviewCategories = ({data, convert}) => {
    
  

        const [categories, setCategories] = useState(["ramilletes", "ramos", "cajas", "anchetas", "eventos", "funebres"])
        const [loading, setLoading] = useState(false)
        
        const bg = 'bg-[linear-gradient(90deg,#c8a25d,#f7e199,#fff4d1,#f7e199,#c8a25d)] min-h-[60vh]'

        useEffect(() => {
          setLoading(!data);
        }, [data]);

        if (loading) {
          return (
            <div className={`${bg} flex flex-col items-center pb-5`}>
              {
                categories.map((category, index)=>(
                  <div key={index}>
                    <h2 className='text-4xl my-5 text-center'>{category.toUpperCase()}</h2>
                    <div className='grid grid-cols-2 gap-4 w-[95vw]'>
                      {
                        Array.from({length: 4}).map((_, index)=>(
                          <SkeletonProduct key={index}></SkeletonProduct>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          );
        }

    return ( 

        <div className={`${bg} flex flex-col items-center`}>

          {categories.map((el)=> (
            
          <PreviewCategory category={el} key={el} data={data} convert={convert}></PreviewCategory>
          ))}
        </div>
      
     );
}
 
export default PreviewCategories;


