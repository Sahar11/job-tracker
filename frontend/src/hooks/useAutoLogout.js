import { useEffect, useRef } from "react";


export default function useAutoLogout( timeout = null, logout) {
 
    const timeRef = useRef();

    // const logout = () => {
    //     localStorage.removeItem("token");
    //     alert("Session expired due to inactivity. Please log in again");
    //     navigate("http://localhost:5000/api/auth/login")
    // }

     const resetTimer = () => {
    clearTimeout(timeRef.current);
    if (timeout && logout) {
      timeRef.current = setTimeout(() => {
        logout();
      }, timeout);
    }
  };
    
    useEffect (() => {
        if (!timeout || !logout) return;
         const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
         events.forEach((event)=> window.addEventListener(event, resetTimer));

         resetTimer(); // start timer immediately

         return() => {
         clearTimeout(timeRef.current);
         events.forEach((event)=> window.removeEventListener(event, resetTimer));
         };
    }, [timeout, logout]);

    
}