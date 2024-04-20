import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios';
//import  Axios  from '../config'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import bcrypt from 'bcryptjs'
import { postKurimiRegister } from '../redux/slices/CustomersSlice';

//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function KuraimiRegister() {

    const dispatch = useDispatch()
 // Get the KurimiRegister items from the store
 const getKurimiReg = useSelector((state) => state.KurimiRegister)
 const { statusReg, errorReg, CustomerName } = getKurimiReg
   // console.log('postItems Batteries:',postItem
    //const [name, setName] = useState('');
    const [customerName, setCustomerName] = useState('');
    
    const [SCustID, setSCustID] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
    const [confPassword, setConfPassword] = useState('');

    const [addressCity, setAddressCity] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [msg, setMsg] = useState('');
 
    const regKurimiCustomer = async (e) => {
        e.preventDefault();
            const kurimiCustomer = {
                SCustID: SCustID,
                customerName: customerName,
                email: email,
                password: hashedPassword,
                addressCity: addressCity,
                CustomerZone: addressCity,
                addressStreet: addressStreet,
                phoneNumber: phoneNumber

            }
            try {
                dispatch(postKurimiRegister(kurimiCustomer))

            } catch (error) {
                setMsg('حصل خطأ اثناء تسجيل العميل')
            }
        
    }
    
    return (
        <div className="MainPage">
        <div className='PostContainer'>
        <h4>
                  <Badge bg="secondary">{msg}</Badge>
                  <Badge bg="secondary">{statusReg}</Badge>

                  
              </h4>
        <Form>
        
        <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="SCust ID"
                                            className="mb-3"
                                        >
                                        <Form.Control type='text' placeholder="SCust ID"  onChange={(e) => {
                                            setSCustID(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="customer Name"
                                            className="mb-3"
                                        >
                                        <Form.Control type='text' placeholder="customer Name"  onChange={(e) => {
                                            setCustomerName(e.target.value)
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
                                            label="conf Password"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="confPassword"  onChange={(e) => {
                                            setConfPassword(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Address City"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="Address City"  onChange={(e) => {
                                            setAddressCity(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Address Street"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="Address Street"  onChange={(e) => {
                                            setAddressStreet(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Phone Number"
                                            className="mb-3"
                                        >
                                        <Form.Control placeholder="Phone Number"  onChange={(e) => {
                                            setPhoneNumber(e.target.value)
                                            }} />
                                    </FloatingLabel>
                                    </Form.Group>
                                    <Button variant="primary" type="button"  onClick={regKurimiCustomer}>
                                        حفظ
                                    </Button>
        </Form>
        </div>
      
      </div>
    )
}
 
export default KuraimiRegister