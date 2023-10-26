import axios from "axios";

const isLocalhost = Boolean(
    window.location.hostname === "localhost" || 
    window.location.hostname === "[::1]" 
);

const API_URL = isLocalhost
? "http://localhost"
: "https://api.alhjaji.com/";

 export default function Axios(){
    axios.create({
        withCredentials: true,
        baseURL: API_URL,
    });
 }
