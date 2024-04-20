import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter,
  Router,
  Route
} from "react-router-dom";

//import useLocalStorage from "use-local-storage";

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import Stack from 'react-bootstrap/Stack';

import './App.css';
import HomePage from './pages/HomePage';
import Register from './users/Register';
import Login from './users/Login';
import CustomerLogin from './users/CustomerLogin';
import AdminPage from './pages/Admin';
import KuraimiRegister from './users/KuraimiRegUser';
import { CustomerLogOut,Customerlogin } from './redux/slices/CustomersSlice';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import CreateTire from './pages/CreateTire';
import Tire from './pages/Tire';
import Checkout from "./pages/pay/checkout";



const App =()=>  {

  const dispatch = useDispatch()

  //const [loginCustomerStorage, setLoginCustomer] = useLocalStorage("loginCustomerStorage", "false");

  const getCustomerInfo = useSelector((state) => state.CustomerAccount)
  const { SignIn, statusLogin, errorLogin,CustomerEmail,phoneNumber,SCustID,CustomerId } = getCustomerInfo


const handleLogout = () => {
  dispatch(CustomerLogOut());
};

  return (
    <Container container-fluid data-bs-theme="dark" dir="rtl" fluid="md" className='container'>
          <Row >
        <Col >
        <Stack gap={1} className="container col-md-12 mx-auto">
        <img src='/LOGO-300.jpg' alt='الحجاجي للتجارة'  height='200%' />
        </Stack>
        </Col>
          </Row>
     
        <Row>

        <Col>
        <div className="navbar" >
          <Nav fill variant="tabs" defaultActiveKey="/HomePage">
            <Nav.Item>
              <Nav.Link href="/HomePage">الرئيسية</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register" eventKey="link-1">تسجيل</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" eventKey="link-2">login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
    </div>
  </Col>
  <Row >
    <Col>
      <Stack   gap={1} className="container col-md-7 mx-auto">
  
        {SignIn ? (
        <div>
          <Badge>اهلا, {CustomerEmail}!</Badge>
          <Badge>, {phoneNumber}!</Badge>
          <Badge>, {SCustID}!</Badge>
          <Badge>, {CustomerId}!</Badge>
          
          <Button onClick={handleLogout}>تسجيل الخروج</Button>
        </div>
      ) : (
        <div>
          <Badge>{statusLogin}</Badge>
          <div>
          <Button as="a" href="/CustomerLogin" variant="primary">
          تسجيل الدخول
          </Button>
            </div>
        </div>
      )}

    </Stack>
  </Col>
    </Row>
    <BrowserRouter>
    <Routes
      // if you're not server rendering, this manages the
      // initial loading state
      fallbackElement={<HomePage />}
      // any rendering or async loading and mutation errors will
      // automatically be caught and render here, no more error
      // state tracking or render branching
      exceptionElement={<HomePage />}
    >
      <Route>
          <Route
            path="/"
            element={<HomePage />}
          />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
       
         <Route  
         path="/AdminPage" 
         element={<AdminPage />} 
         />
         <Route  
         path="/kurimiRegister" 
         element={<KuraimiRegister />} 
         />
 

        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/CreateTire" element={<CreateTire />} />
        <Route path="/post/:postId" element={<Post />}/>
        <Route path="/tire/:tireId" element={<Tire />}/>
   
          <Route path="/Checkout/:tiresize" exact>
          <Checkout />
        </Route>

        <Route
            path="/HomePage"
            element={<HomePage />}
          />
      
      </Route>
    </Routes>
  </BrowserRouter>
 </Row>

<Row>
<Col>
<div className="footer">
          <img src='/LOGO-300.png' alt='bajaber' width={80}/>
          <Nav fill variant="tabs" defaultActiveKey="/HomePage">
        
            <Nav.Item>
              <Nav.Link href="/HomePage">الرئيسية</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register" eventKey="link-1">تسجيل</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login" eventKey="link-2">login</Nav.Link>
            </Nav.Item>
          </Nav>
 
    </div>
</Col>

</Row>
<Row>

</Row>
  </Container>

  );
}

export default App;
