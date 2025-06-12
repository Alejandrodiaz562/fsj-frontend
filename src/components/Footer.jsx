const Footer = () => {
    return ( 
        <div className="min-h-[30vh] bg-myblue p-5 sm:grid sm:grid-cols-4 gap-20">
            <div className="mb-4">
                <h2 className="text-2xl text-white ">Domicilios</h2>
                <p className="text-gray-400">Domicilio en Medellin, Area metropolitana y municipios cercanos</p>
                <p className="text-gray-400">(el costo del Domicilio depende del lugar de entrega)</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl text-white">Numero</h2>
                <p className="text-gray-400">321-631-15-42</p>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl text-white">Ubicanos</h2>
                <a href="https://maps.app.goo.gl/zABYt8JoKC7F5R6dA" className="text-gray-400">Cl. 98 # 69 - 26, Castilla, Medellín, Antioquia</a>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl text-white">Horarios de atencion</h2>
                <p className="text-gray-400">Lunes a Sabado de 8 am a 8 pm</p>
                <p className="text-gray-400">Domingos y Festivos de 8 am a 2 pm</p>

            </div>
        </div>
        
     );
}
 
export default Footer;