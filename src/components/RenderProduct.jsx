import { Link } from 'react-router-dom';
import { useState } from 'react';
import SkeletonProduct from './SkeletonProduct';

const RenderProduct = ({id, image, price}) => {

    const [imgLoaded, setImgLoaded] = useState(false);

    
    return ( 
        <Link to={`/product/${id}`}>
            <div className='    w-[100%] aspect-square relative z-[1] rounded-md overflow-hidden shadow-[5px_5px_10px_5px_#c8a25d]'>
                {
                    !imgLoaded && (
                        <SkeletonProduct/>
                    )
                }
                <img src={image} alt="" className='w-[100%] h-[100%] object-cover' onLoad={() => setImgLoaded(true)} onError={() => console.log('Error cargando la imagen')} />
                <div className='absolute z-[1] right-0 bottom-0 p-[3%] bg-price text-white'>
                    <p>{price}</p>
                </div>
            </div>  
        </Link>
     );
}
 
export default RenderProduct;