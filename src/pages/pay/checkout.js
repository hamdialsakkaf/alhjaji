import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useNavigate    } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ChooseBankCard from './BankingCards/BankingCards';
//import { Customerlogin } from '../redux/slices/CustomersSlice';


//function Checkout() {
  const Checkout = () => {
    const navigate = useNavigate();
    const { price,tiresize } = useParams();
        console.log(' price :',price)
        console.log(' tiresize :',tiresize)
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    const increase = (()=> {
      const Q = quantity + 1;
      setQuantity(Q);
    })
    
    const decrease = (()=> {
      const Q = quantity - 1;
      setQuantity(Q)
    })

    useEffect(() => {
      const totaly = Gettotal
      console.log('totaly:',totaly)
      setTotal(totaly)

    }, [quantity])

    const Gettotal = (() => {
      const totaly = quantity * price;
      return totaly
    })
    const getCustomerInfo = useSelector((state) => state.CustomerAccount)
    const { SignIn,SCustID,CustomerId, statusLogin, errorLogin,CustomerEmail,phoneNumber,CustomerName,AddressStreet,AddressCity } = getCustomerInfo
    //const { SignIn, statusLogin, errorLogin } = getSignIn

    console.log('getSignIn SignIn:',SignIn)
    console.log('Customer Email :',CustomerEmail)

    
    useEffect(()=>{
        if(!SignIn) {
          navigate("/customerlogin")
        } 
    },[SignIn])

    return (
      <Container fluid>      
      <Row>
        <Col>
        <Card
          bg='Primary'
          key={phoneNumber}
         
          className="mb-2"
        >
          <Card.Header>
          <Form.Text muted className="text-center">
            <h2>
              فاتورة الشراء
            </h2>
           
            </Form.Text>

          </Card.Header>
          <Card.Body>
            <Card.Title>
            <h4>تفاصيل طلبك في الجدول ادناه</h4>
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
          <Row>
                <Col lg={true}>
                <ListGroup>
                <ListGroup.Item>  <h4>
                اسم العميل: {CustomerName}   
                  </h4></ListGroup.Item>
                <ListGroup.Item>  <h4>
                رقم التلفون : {phoneNumber}   
                  </h4></ListGroup.Item>
                <ListGroup.Item><h4>الأيميل:  {CustomerEmail}  
                </h4></ListGroup.Item>
                <ListGroup.Item><h4>
                  المدينة : {AddressCity}   
            </h4></ListGroup.Item>
            <ListGroup.Item><h4>
                  العنوان : {AddressStreet}   
            </h4></ListGroup.Item>
              </ListGroup>
                </Col>
          </Row>

     <Row>
      <Col>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>المنتج</th>
          <th>سعر الوحدة</th>
          <th>الكمية</th>
          <th>اجمالي الفاتورة</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{tiresize}</td>
          <td>{price}</td>
          <td> 
          <Button variant="primary" type="button"  onClick={decrease}>
                -
            </Button>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="الكمية"
                                            className="mb-3"
                                        >
                                        <Form.Control type='number' placeholder="الكمية" 
                                        value={quantity}  
                                        onChange={(e) => {
                                            setQuantity(e.target.value)
                                            }} 
                                            
                                        />
                                    </FloatingLabel>
                                    </Form.Group>
                                    <Button variant="primary" type="button"  onClick={increase}>
                                        +
                                    </Button>          
            </td>
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
        </Col>
      </Row>
      <Row>
        <Col>
        <ChooseBankCard amount={total} refno='123' scustid={SCustID} crcy='R' />
        </Col>
      </Row>
     </Container>
         )
 }
 
export default Checkout;