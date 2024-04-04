import React from 'react'
import {
  BrowserRouter,
  Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './users/Register';
import Login from './users/Login';
import AdminPage from './pages/Admin';

import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import CreateTire from './pages/CreateTire';
import Tire from './pages/Tire';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://api.imagemarketing.net:4000');

const App =() => {

  return (
    <Container container-fluid data-bs-theme="dark" dir="rtl" fluid="md" className='container'>
          <Row >
        <Col >
        <Stack   gap={1} className="container col-md-12 mx-auto">
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
         <Route  
         path="/AdminPage" 
         element={<AdminPage />} 
         />
         
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/CreateTire" element={<CreateTire />} />
        <Route path="/post/:postId" element={<Post />}/>
        <Route path="/tire/:tireId" element={<Tire />}/>
        <Route
            path="/HomePage"
            element={<HomePage />}
          />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
     
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
