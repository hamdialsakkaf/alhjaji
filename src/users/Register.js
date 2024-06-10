import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

//import  Axios  from '../config'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import bcrypt from 'bcryptjs'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../redux/slices/adminSlice';

function Register() {
    const dispatch = useDispatch()

    const getCustomerInfo = useSelector((state) => state.AdminAccount)
    const { loading, userInfo, error, success } = getCustomerInfo
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
 
    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // redirect authenticated user to profile screen
       // if (userInfo) navigate('/user-profile')
      }, [navigate, userInfo, success])

      
    const registeruser = async (e) => {
        e.preventDefault();
         // check if passwords match
    if (password !== confPassword) {
        alert('كلمة السر غير متطابقة')
        return
      }
        const user = {
            name:name,
            email: email,
            passowrd: hashedPassword
             }
      console.log('registeruser data', user.email + ' ' + user.passowrd)
      console.log('hashedPassword:', hashedPassword)
            try {
                dispatch(registerUser(user))
    
            } catch (error) {
    
                setMsg('حصل خطأ اثناء محاولة تسجيل حساب  ')
            }
        
    }

    const submitUser = async (e) => {
        e.preventDefault();
            const user = {
                name: name,
                email: email,
                passowrd: hashedPassword,
            }
            await axios.post('http://localhost:5000/users', 
            user,
            ).then((res)=> {
                setMsg('تم تسجيل المستخدم بنجاح');
               // alert('تم التسجيل بنجاح')
            }).catch((err) =>{
                setMsg('خطأ في تسجيل المستخدم')
            })
        
    }
    return (
        <div className="MainPage">
        <div className='PostContainer'>
        <h4>
                  <Badge bg="secondary">{msg}</Badge>
                  {error && <h2>{error}</h2>}

              </h4>
              <Link to="/kurimiRegister">About</Link>
        <Form>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Name"
                                            className="mb-3"
                                        >
                                        <Form.Control type='text' placeholder="Name"  onChange={(e) => {
                                            setName(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>

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

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="confPassword"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="password"  onChange={(e) => {
                                            setConfPassword(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>

                                    <Button variant="primary" type="button"  onClick={submitUser}>
                                        حفظ
                                    </Button>
                                    <Button variant="primary" type="button"  onClick={registeruser}>
                                regUserDispatch
                                    </Button>
        </Form>
        </div>
      
      </div>
    )
}
 
export default Register