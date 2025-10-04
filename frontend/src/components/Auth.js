import { useState } from "react";
import axios from "axios";

function Auth({ setUser, setToken}) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: ""});
   // const [token, setToken] = useState(localStorage.getItem("token") || ""); // token state

    const handleSubmit = async () => {
        const endpoint = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
        const res = await axios.post(endpoint, form);
     try {
      const res = await axios.post(endpoint, form);
        if(isLogin) {
            localStorage.setItem("token", res.data.token);
            console.log(res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
        } else {
            alert("Registration successful, please login");
            setIsLogin(true);
        }
         } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }

};

return (
    <div className="p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

        {isLogin && (
            <input className="border p-2 w-full mb-2" placeholder="Name"
                   onChange={e => setForm({...form, name: e.target.value})}/>
        )}

        <input className="border p-2 w-full mb-2" placeholder="Email"
        onChange={e=> setForm({...form, email:e.target.value})}/>

        <input className="border p-2 w-full mb-2" type="password" placeholder="Password"
               onChange={e=> setForm({...form, password: e.target.value})} />
        
        <button className="bg-blue-600, text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
        </button>
        <p className="mt-3 text-sm cursor-pointer text-ble-500"
           onClick={()=> setIsLogin(!isLogin)}>
            {isLogin? "Need an account? Register": "Already have an account? Login"}
           </p>
    </div>
)
}

export default Auth;