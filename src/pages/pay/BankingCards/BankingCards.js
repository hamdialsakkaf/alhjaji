import React,{useState,useEffect } from 'react'
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

//Axios.defaults.baseurl = process.env.react_app_be_url;
  const ChooseBankCard = ({amount,refno,scustid,crcy}) => {
   
    const [paymentCards, setPaymentCards]= useState([]);

    const getData = async() => {
     await axios.get('https://api.imagemarketing.net/chooseBankCard',
    ).then((data)=>{
        setPaymentCards(data.data)
    })
    }
  
    useEffect(async()=> {
        console.log('paymentCards:',paymentCards)
      await getData()
   }, [])
 
    return (
      <div>
      <Container fluid="md" className="container">      
      
        <div>
               <h4>
              <Badge bg="danger"  > حدد بطاقة الدفع</Badge >
              </h4>
               </div>
           <Container>
            <Row>
              
           {//tireList.map((val)=>{
             // Array.isArray(tireList) ?
             paymentCards.map((val)=>{
                  const {id, PaymentCardName, PaymentCardNameAr, logo,PaymentCardPin} = val;

            return (
             <Col sm={4} xs="auto">
                <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>دفع باستخدام  {PaymentCardNameAr} #</Accordion.Header>
                    <Accordion.Body>
                {PaymentCardName}

                <Card 
                     key={id} 
                    sm={4}
                        bg="primary"
                        text='white'
                    // border="warning" 
                    >
              <Card.Img variant="top" src={logo}  />
                <Card.Header>
                <Card.Title><Badge bg="warning" text="dark">
                     {PaymentCardNameAr } 
                     </Badge>
                     </Card.Title>
              </Card.Header>
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                     {PaymentCardNameAr } 
                     </Badge>
                     </Card.Title>
                     <Form>
                     <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="المجموع"
                                            className="mb-3"
                                        >
                                     {amount}
                                    </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="العملة"
                                            className="mb-3"
                                        >
                                    {crcy}
                                    </FloatingLabel>
                                    </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="رقم المرجع"
                                            className="mb-3"
                                        >
                                    {refno}
                                    </FloatingLabel>
                                    </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="رقم العميل"
                                            className="mb-3"
                                        >
                                    {scustid}
                                    </FloatingLabel>
                                    </Form.Group>

                                    <Button variant="primary" type="button">
                                        حفظ
                                    </Button>                                        
                                    </Form>
                    <Card.Text>
                  </Card.Text>

                  </Card.Body>
            </Card>
            </Accordion.Body>
        </Accordion.Item>

        </Accordion>
          
              </Col>
              ) })
               // : null
              } 
              </Row>
         </Container>            

        </Container>
        </div>
            )
        }

export default ChooseBankCard;
