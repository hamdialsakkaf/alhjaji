import React from 'react'
import {BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import AdminPage from './pages/Admin';

import CreatePost from './pages/CreatePost';
import Post from './pages/Post'
import CreateTire from './pages/CreateTire';
import Tire from './pages/Tire';
import Register from './users/Register';
import Login from './users/Login';
import HomePage from './pages/HomePage';

const App =() => {
/*
  // useState hook to keep track of the login state
  const [login, setLogin] = useState(() => {
 
    // Used local storage to sustain the login state
    if(!localStorage.getItem("login")){
      localStorage.setItem("login", "false");
      return false;
    }
    return JSON.parse(localStorage.getItem("login"));
  });

 // Updating the local storage whenever 
  // the login state changes
  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);
 
  // Click Handler updates the login state
  // when the button is clicked
  const click = () => {
    setLogin((prev) => {
      return !prev;
    });
  }
*/

  return (
    <Container container-fluid data-bs-theme="dark" dir="rtl">
        <Row>
        <h4 class="brandContainer">
            الحجاجي للتجارة والتسويق
        </h4>
        <div className="navbar">
          <img src='/hajajy.png' alt='alhajaji' width={80} height='100%'/>
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
    <div>

 <Router>
<Routes>
<Route path="/" exact element={<HomePage />}  />
<Route path="/HomePage" element={<HomePage />} />
<Route path="/Register" element={<Register />} />
<Route path="/createpost" element={<CreatePost />} />
<Route path="/CreateTire" element={<CreateTire />} />

<Route path="/Login" element={<Login />} />
<Route path="/AdminPage" element={<AdminPage />} />


<Route path="/post/:postId" element={<Post />}/>
<Route path="/tire/:tireId" element={<Tire />}/>
</Routes>
</Router>
 </div>
 </Row>

<Row>
<Col>
<div className="navbar">
          <img src='/hajajy.png' alt='alhjaji' width={80} height='100%'/>
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
