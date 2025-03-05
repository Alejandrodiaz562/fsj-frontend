import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";


const AdminLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          if (user.email === "alejodv562@gmail.com") {
            navigate("/");
          } else {
            setError("No tienes permisos para acceder.");
          }
        } catch (err) {
          setError("Correo o contraseña incorrectos.");
        }
      };

      
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-myblue">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold text-center mb-4">Iniciar Sesion</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col">
              <input 
                type="email"
                placeholder="Correo"
                className="border p-2 rounded mb-2"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
              />
              <input 
                type="password"
                placeholder="Contraseña"
                className="border p-2 rounded mb-2"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <button className="bg-blue-500 text-white p-2 rounded">Ingresar</button>
            </form>
          </div>
        </div>
     );
}
 
export default AdminLogin;