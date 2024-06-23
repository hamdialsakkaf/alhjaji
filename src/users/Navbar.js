import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import  Axios  from '../config'

const Navbar = () => {
    //const history = useNavigate();
   
    const Logout = async () => {
        /* القديم الصالح
        if(localStorage.getItem("login")){
            const login = JSON.parse(localStorage.setItem("login",false))
            console.log('logOut:', login)
           // setAuth(login);
             return login;
        }
        */
        if (login) {
            setAuth(login);

            return login;
        }
            }
/*
    const Logout = async () => {
        await axios.delete('http://api.imagemarketing.net/logout')
            //await axios.delete('http://api.imagemarketing.net/logout')
            .then(res => {
                history.push("/");
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
            }
*/
 
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                    </a>
 
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                            Home
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar