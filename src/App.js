import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter,NavLink,Routes, Route, Link  } from 'react-router-dom';

//import useLocalStorage from "use-local-storage";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
    // (
      SignIn ?
    <Container container-fluid data-bs-theme="dark" dir="rtl" fluid="md" className='container'>
      <Row >
        <Col >
        <Stack gap={1} className="container col-md-12 mx-auto">
        <img src='/LOGO-300.jpg' alt='الحجاجي للتجارة'  height='200%' />
        </Stack>
        </Col>
          </Row>
   <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">قائمة الخدمات</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">الرئيسية</Nav.Link>
          <NavDropdown title="المستخدم" id="basic-nav-dropdown">           
            <NavDropdown.Item href="/customerLogin"
            >
               <Button onClick={handleLogout}>تسجيل الخروج</Button>
               تسجيل الخروج</NavDropdown.Item>
            <NavDropdown.Divider />
         
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Row >
    <Col>
      <Stack  gap={1} className="container col-md-7 mx-auto">
  
        <div>
          <Badge>اهلا, {CustomerEmail}!</Badge>
          <Badge>, {phoneNumber}!</Badge>
          <Badge>, {SCustID}!</Badge>
          <Badge>, {CustomerId}!</Badge>
          
          <Button onClick={handleLogout}>تسجيل الخروج</Button>
        </div>

    </Stack>
  </Col>
    </Row>
    <Row>
    <Routes>
    <Route 
      // if you're not server rendering, this manages the
      // initial loading state
     fallbackElement={<HomePage />}
      // any rendering or async loading and mutation errors will
      // automatically be caught and render here, no more error
      // state tracking or render branching
      exceptionElement={<HomePage />}
    >    </Route>

          <Route
            path="/"
            element={<HomePage />}
          />

        <Route path="checkout" element={<Checkout />}>
          <Route path=":price/product/:tiresize" element={<Checkout />}/>
        </Route>

        <Route path='/checkout/:price' element={<Checkout />}></Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
       
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
        <Route path="*" element={<HomePage />} />
  </Routes>
 </Row>

<Row>

</Row>

  </Container>
  : 

   <Container container-fluid data-bs-theme="dark" dir="rtl" fluid="md" className='container'>
   <Row >
     <Col >
     <Stack gap={1} className="container col-md-12 mx-auto">
     <img src='/LOGO-300.jpg' alt='الحجاجي للتجارة'  height='200%' />
     </Stack>
     </Col>
       </Row>
<Navbar expand="lg" className="bg-body-tertiary">
 <Container>
   <Navbar.Brand href="#home">قائمة الخدمات</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
       <Nav.Link href="/">الرئيسية</Nav.Link>
       <NavDropdown title="المستخدم" id="basic-nav-dropdown">
         <NavDropdown.Item href="/register">مستخدم جديد</NavDropdown.Item>
         <NavDropdown.Item href="/login">
           تسجيل الدخول
         </NavDropdown.Item>
         <NavDropdown.Item href="/customerLogin">دخول العملاء</NavDropdown.Item>
         <NavDropdown.Divider />
      
       </NavDropdown>
     </Nav>
   </Navbar.Collapse>
 </Container>
</Navbar>
<Row >
 <Col>
   <Stack  gap={1} className="container col-md-7 mx-auto">
     <div>
       <Badge>{statusLogin}</Badge>
       <div>
       <Button as="a" href="/customerLogin" variant="primary">
       تسجيل الدخول
       </Button>
         </div>
     </div>


 </Stack>
</Col>
 </Row>
 <Row>
 <Routes>
 <Route 
   // if you're not server rendering, this manages the
   // initial loading state
  fallbackElement={<HomePage />}
   // any rendering or async loading and mutation errors will
   // automatically be caught and render here, no more error
   // state tracking or render branching
   exceptionElement={<HomePage />}
 >    </Route>

       <Route
         path="/"
         element={<HomePage />}
       />

     <Route path="checkout" element={<Checkout />}>
       <Route path=":price/product/:tiresize" element={<Checkout />}/>
     </Route>

     <Route path='/checkout/:price' element={<Checkout />}></Route>

     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     <Route path="/customerLogin" element={<CustomerLogin />} />
    
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
     <Route path="*" element={<HomePage />} />
</Routes>
</Row>

<Row>

</Row>
</Container>
)
//}

}

export default App;
