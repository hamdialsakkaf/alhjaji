import React, { useEffect, useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { useParams,useLocation,useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios';
//import  Axios  from '../config'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
//import { Link } from 'react-router-dom';

import bcrypt from 'bcryptjs'
import { adminlogins } from '../redux/slices/adminSlice';

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const getAdminInfo = useSelector((state) => state.AdminAccount)
    const { userToken, userInfo, SignInAdmin,statusAdminLogin,permissionAdmin } = getAdminInfo
    
    const [auth, setAuth] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [permissions, setPermissions] = useState('');
      // useState hook to inform the user about the loading state
    const [loading, setLoading] = useState(true);

    
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

/*
    useEffect(()=>{
        if(localStorage.getItem("login")){
            const login = JSON.parse(localStorage.getItem("login"))
            console.log('login effect:', login)
            setAuth(login);
             //return login;
        }
        if(auth) {
           navigate('/AdminPage')
        }
    },[auth])
*/

useEffect(()=>{
    if (SignInAdmin) {
      console.log('adminLogin auth yes:', SignInAdmin)
      navigate("/AdminPage", { replace: true });
    } else {
      console.log('adminLogin auth no:', SignInAdmin)
      navigate("/adminLogin", { replace: true });
    }
  
  },[SignInAdmin])

    /*
    useEffect(() => {
       
        // Sign in request
        axios.post("http://localhost:5000/adminlogin", { email: email, password: password })
         .then((response) => {
          console.log("Sign in successful", response.data);
          // Store the authentication token for subsequent requests
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         })
         .catch((error) => {
          console.error("Sign in error", error);
         });
        // Test request
        /*
        axios.get("/test")
         .then((response) => {
          console.log("Test request successful", response.data);
         })
         .catch((error) => {
          console.error("Test request error", error);
         });
         
       }, []);
*/
const user = {
    email: email,
    passowrd: hashedPassword
     }
const loginAdmin = async (e) => {
    e.preventDefault();
 
  
        try {
            dispatch(adminlogins(user))

        } catch (error) {
            console.log(' dispatch(adminlogins error:',error)
            setMsg('حصل خطأ اثناء تسجيل الدخول ')
        }
    
}
    const submitAuth = async (e) => {
        e.preventDefault();
        
           // Axios.get(`http://localhost:3002/login/${email}`).then((data)=>{
            setLoading(true);
            const user = {
                email: email,
                passowrd: hashedPassword
            }
            //await axios.post('https://api.agtco.info/api/login', 

            // Sign in request
            //axios.post("http://localhost:5000/adminlogin", { username: "exampleuser", password: "password123" })
            /*
            axios.post("http://localhost:5000/adminlogin", { email, password })
            .then((response) => {
                console.log("Sign in successful", response.data);
                // Store the authentication token for subsequent requests
                const token = response.data.token;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                })
                .catch((error) => {
                console.error("Sign in error", error);
                //navigate('/Login', { replace: true })
                //setMsg(error);
                });
             */
                await axios.post('http://localhost:5000/adminlogin', 
                    user,
                    ).then((res)=> {
                        setMsg('تم تسجيل المستخدم بنجاح');
                        console.log("Sign in successful", res.data[0]);
                       // alert('تم التسجيل بنجاح')
                    }).catch((err) =>{
                        setMsg('خطأ في تسجيل المستخدم')
                    })

           // axios.post('http://localhost:5000/adminlogin', user, 
              //  { headers }
        
                
                //Adding token to the request
              
                // السابق الصالح
            //await axios.post('http://localhost:5000/adminlogin', 
                   // user
            /*
            ).then((data)=>{
                console.log('permissions:', data.data[0])

               // setPermissions(data.data[0].Permissions)
                console.log('permissions:', data.data[0])
               if(hashedPassword === data.data[0].password) {
                if(permissions === "admin") {
                        localStorage.setItem("login", 'true');
                        setAuth(true);
                         navigate("/AdminPage", { replace: true });

                        } else {
                            setMsg('لا تملك صلاحيات، يرجى طلب صلاحيات من الادارة')
                            setAuth(false);
                        }
                    } else {    
                        setAuth(false);
                         // Used local storage to sustain the login state
                        if(!localStorage.getItem("login")){
                            localStorage.setItem("login", 'false');
                            setAuth(false);
                             return true;
                    }
                        setMsg('بيانات ادخال غير صحيحة')
                    }
              
             })
           */
    
        
    }
 
    return (
        <div className="MainPage">
        <div className='PostContainer'>
          
        <Form>
                            <Badge bg="secondary">msg:{msg}</Badge>
                            <Badge bg="secondary">userToken:{userToken}</Badge>
                            <Badge bg="secondary">userInfo:{userInfo}</Badge>
                            <Badge bg="secondary">statusAdminLogin:{statusAdminLogin}</Badge>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="Email"  onChange={(e) => {
                                            setEmail(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="password"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="password"  onChange={(e) => {
                                            setPassword(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                <Button variant="primary" type="button"  onClick={submitAuth}>
                                        دخول
                                    </Button>
                                    <Button variant="primary" type="button"  onClick={loginAdmin}>
                                    loginAdminDispatch
                                    </Button>
                        </Form>
                                    </div>
                             </div>
    )
 }
 
export default AdminLogin