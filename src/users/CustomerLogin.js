import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom';
import { useParams,useLocation,useNavigate    } from "react-router-dom";

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import bcrypt from 'bcryptjs'

import { Customerlogin } from '../redux/slices/CustomersSlice';


function CustomerLogin() {
    const navigate = useNavigate();
   // const persistStorage = localStorage.getItem("persist:root");
    //console.log('persistStorage:', persistStorage.SignIn)

    const dispatch = useDispatch()

    const getCustomerInfo = useSelector((state) => state.CustomerAccount)
    const { SignIn, statusLogin, errorLogin,CustomerEmail,phoneNumber } = getCustomerInfo
    //const { SignIn, statusLogin, errorLogin } = getSignIn

    console.log('getSignIn SignIn:',SignIn)
    console.log('Customer Email :',CustomerEmail)

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
      // useState hook to inform the user about the loading state
    const [loading, setLoading] = useState(true);
    const [loginStorage, setLoginStorage] = useState(false);
    const [authCustomer, setAuthCustomer] = useState(false);

    
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    /*
    const getLoginStorage = (()=> {
        if(localStorage.getItem("customerlogin")){
            const customerloginState = JSON.parse(localStorage.getItem("customerlogin"))
          console.log('customerlogin localStorage:', customerloginState)
         // setAuth(customerlogin);
        
           return customerloginState;
      }
    })
    */
    useEffect(()=>{
      
        if(SignIn) {
           navigate('/HomePage')
        } else {
            navigate("/customerlogin")
        }
    },[SignIn])

/*
useEffect(()=>{
    if(localStorage.getItem("loginCustomerStorage")){
        const loginCustomerStorage = JSON.parse(localStorage.getItem("loginCustomerStorage"))
        console.log('login loginCustomerStorage:', loginCustomerStorage)
        console.log('authCustomer :', authCustomer)

        setAuthCustomer(loginCustomerStorage);
         //return login;
    }
    if(authCustomer) {
       navigate('/HomePage')
    } else {
        navigate('/customerlogin')
    }
},[SignIn])
*/

    const loginCustomer = async (e) => {
        e.preventDefault();
        const customer = {
            mobileNumber: mobileNumber,
            passowrd: hashedPassword
             }
      
            try {
                dispatch(Customerlogin(customer))

            } catch (error) {

                setMsg('حصل خطأ اثناء تسجيل الدخول ')
            }
        
    }

    const submitAuth = async (e) => {
        e.preventDefault();
        try {
           // Axios.get(`http://localhost:3002/login/${email}`).then((data)=>{
            setLoading(true);
            const customer = {
                mobileNumber: mobileNumber,
                passowrd: hashedPassword
            }
            //await axios.post('https://api.agtco.info/api/login', 
            await axios.post('https://api.imagemarketing.net/Customerlogin', 
            customer
            ).then((data)=>{
               // setPermissions(data.data[0].Permissions)
               if(hashedPassword === data.data[0].password) {
                localStorage.setItem("customerlogin", 'true');
               // setAuth(true);
                 navigate("/HomePage", { replace: true });
                    } else {    
                       // setAuth(false);
                        setMsg('كلمة السر غير مطابقة!، تأكد من كلمة السر ثم عاود المحاولة. شكراً')
                         // Used local storage to sustain the login state
                        if(!localStorage.getItem("customerlogin")){
                            localStorage.setItem("customerlogin", 'false');
                          //  setAuth(false);
                             return true;
                    }
                        setMsg('بيانات الدخول غير صحيحة')
                    }
              
             })
           
        } catch (error) {
            //navigate("/Login")
            //history.push("/Login")
            navigate('/customerlogin', { replace: true })
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
                                            label="Mobile Number"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="Mobile Number"  onChange={(e) => {
                                            setMobileNumber(e.target.value)
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
                                    <Button variant="primary" type="button"  onClick={loginCustomer}>
                                    loginCustomer
                                    </Button>
                                    
                        </Form>
                                    </div>
                             </div>
    )
 }
 
export default CustomerLogin