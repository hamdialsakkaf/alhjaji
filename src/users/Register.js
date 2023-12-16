import React, { useState } from 'react'
import axios from 'axios';
//import  Axios  from '../config'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import bcrypt from 'bcryptjs'

//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
 
    const submitUser = async (e) => {
        e.preventDefault();
            const user = {
                name: name,
                email: email,
                password: hashedPassword,
            }
            await axios.post('http://api.imagemarketing.net/users', 
            user,
            ).then((res)=> {
                setMsg('تم تسجيل المستخدم بنجاح');
               // alert('تم التسجيل بنجاح')
            }).catch((err) =>{
                setMsg('خطأ في تسجيل المستخدم')
            }
            )
            //history.push("/");
        
    }
    return (
        <div className="MainPage">
        <div className='PostContainer'>
        <h4>
                  <Badge bg="secondary">{msg}</Badge>
              </h4>
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
        </Form>
        </div>
      
      </div>
    )
}
 
export default Register