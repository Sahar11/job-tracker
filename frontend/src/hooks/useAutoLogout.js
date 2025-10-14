import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useAutoLogout( timeout = 5 * 60 * 1000) {
    const navigate = useNavigate();
    const timeRef = useRef();

    const logout = () => {
        localStorage.removeItem("token");
        alert("Session expired due to inactivity. Please log in again");
        navigate("/login")
    }

    const resetTimer = () => {
        clearTimeout(timeRef.current);
        timeRef.current = setTimeout(logout, timeout);
    };
    
    useEffect (() => {
         const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
         events.forEach((event)=> window.addEventListener(event, resetTimer));

         resetTimer(); // start timer immediately

         return() => {
         clearTimeout(timeRef.current);
         events.forEach((event)=> window.removeEventListener(event, resetTimer));
         };
    }, []);

    return null;
}