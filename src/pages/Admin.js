import React, { useState, useEffect} from "react";
import {BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import CreateTire from "./CreateTire";
import Login from "../users/Login";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const history = useNavigate();

    // useState hook to keep track of the login state
  const [login, setLogin] = useState(() => {
    return JSON.parse(localStorage.getItem("login"));

  });
  const loginlocal = JSON.parse(localStorage.getItem("login"));
  console.log('Login loginlocal:', loginlocal)

  // Updating the local storage whenever 
  // the login state changes
  useEffect(() => {
    console.log('Login state effect:', login)

    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);

  // Click Handler updates the login state
  // when the button is clicked
  const click = () => {
    setLogin((prev) => {
      return !prev;
    });
  }
 
	return(
        <div className="MainPage">
        <div className="PostContainer">
            {
        login ? (
             //children 
          <div className="MainPage">
          <div className="PostContainer">
          <Link to={"/AdminPage"}>Admin</Link>
          <Link to={"/"}>Home</Link>
          <Link to={"/createpost"}>createpost</Link>
          <Link to={"/CreateTire"}>CreateTire</Link>
          </div>
          <button onClick={() => click()}>
            {login? "Logout" : "Login"}
          </button>
          </div>
        
          ) : 
            history("/Login")
        
        }
          
        </div>
        </div>
            

      
   

	)
}

export default AdminPage;
