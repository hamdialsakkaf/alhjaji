import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import  Axios  from '../config'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import bcrypt from 'bcryptjs'

//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [permissions, setPermissions] = useState('');
      // useState hook to inform the user about the loading state
    const [loading, setLoading] = useState(true);

    const [auth, setAuth] = useState(false);
    
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
    //let history = useHistory();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("login")){
            const login = JSON.parse(localStorage.getItem("login"))
            console.log('login effect:', login)
            setAuth(login);
            // return true;
        }
        if(auth) {
           navigate('/AdminPage')
        }
    },[auth])

    const submitAuth = async (e) => {
        e.preventDefault();
        try {
           // Axios.get(`http://localhost:3002/login/${email}`).then((data)=>{
            setLoading(true);
            const user = {
                email: email,
                passowrd: hashedPassword
            }
            //await axios.post('https://api.agtco.info/api/login', 
            await axios.post('http://api.imagemarketing.net/login', 
                user
            ).then((data)=>{
                setPermissions(data.data[0].Permissions)
                console.log('permissions:', permissions)
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
           
        } catch (error) {
            //navigate("/Login")
            //history.push("/Login")
            navigate('/Login', { replace: true })
                setMsg(error.data.data);
        }
    }

    return (
        <div className="MainPage">
        <div className='PostContainer'>
        <Form>
                         <h4>
                            <Badge bg="secondary">{msg}</Badge>

                             </h4>
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
                        </Form>
                                    </div>
                             </div>
    )
 }
 
export default Login