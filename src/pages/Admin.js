import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'

//import { useNavigate } from 'react-router-dom';
import { useParams,useLocation,useNavigate    } from "react-router-dom";

import useLocalStorage from "use-local-storage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import {io} from 'socket.io-client'

// Importing toastify module
import { Bounce,Slide,toast,ToastContainer,cssTransition } from "react-toastify";
 
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

//import { getGtItems } from "../redux/slices/gtSlice";
//import { getBuyerRequests, setInprogressRequset } from "../redux/slices/getBuyerRequestSlice";
import { AdminLogOut } from "../redux/slices/adminSlice";

const AdminPage = () => {
  const dispatch = useDispatch()
   // Get the gtTires from the store
   const getAdminInfo = useSelector((state) => state.AdminAccount)
   const { userToken, userInfo,AdminEmail, SignInAdmin,statusAdminLogin,permissionAdmin } = getAdminInfo
  
//console.log(' buyerRequests.stateRequest:',  buyerRequests.stateRequest)
const [ buyerShopName,setBuyerShopName  ] = useState('')
const [ requestid,setRequestid  ] = useState('')
let [stateRequest, setStateRequest] = useState('')

  const [currentPage, setCurrentPage] = useState(1);


  const navigate = useNavigate();
 
  useEffect(()=>{
    if (SignInAdmin) {
      console.log('SignInAdmin yes:', SignInAdmin)
      navigate("/AdminPage", { replace: true });
    } else {
      console.log('SignInAdmin no:', SignInAdmin)
      navigate("/adminLogin", { replace: true });
    }
  
  },[SignInAdmin])

  
  const bounce = cssTransition({
    collapse: true,
    enter: "animate__animated animate__bounceIn",
    //exit: "animate__animated animate__bounceOut"
  });
  function animateCss() {
    toast.success("مرحباً 👋, وصل طلب جديد!", {  
      transition: bounce,
      autoClose:false,
      icon: "🚀"

    });
  }

  const [newBuerRequest, setNewBuerRequest] = useState('اعلامات الطلبات الجديدة') 
  const [newbuyerShopName, setNewbuyerShopName] = useState('') 

  
  const Msg = () => (
    <Form.Text muted className="text-center">
    <h4>
    {newbuyerShopName}
    </h4>
    <h4>
    {newBuerRequest}
    </h4>
    </Form.Text>

  );



  const notify = () => {
    toast.info(<Msg />,{
      autoClose: false,
      icon: "👍"
    });
  };

  //const notify = () => toast(<Msg />, { 
   //const notify = () =>animateCss()

  useEffect(() => {
    dispatch(notify)

  }, [newBuerRequest])

  
  useEffect(()=>{
    try {
      console.log('starting socket in client..')
      const socket = io('http://localhost:5000', {
        //withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      socket.on('connect', ()=>console.log(socket.id))
      socket.on('connect_error', ()=>{
        setTimeout(()=>socket.connect(),5000)
      })
      socket.on('newBuerRequest', (data)=>{
        console.log('newBuerRequest', data.product)
        console.log('data.buyerShopName', data.buyerShopName)

        setNewBuerRequest(data.product)
        setNewbuyerShopName(data.buyerShopName)

      })

      console.log('newBuerRequest:', newBuerRequest)
    } catch (error) {
      console.log('Socket error Client:',error)
    }
  
},[])


const handlePagination = (pageNumber) => {
  setCurrentPage(pageNumber);
};

    
  const reqDetaile = {
    requestid: requestid,
    buyerShopName:buyerShopName
  }

   

 // const [username, setUsername] = useLocalStorage("name", "");


  //const [login, setLogin] = useLocalStorage("login", "false");
  //console.log('login getLogin:', login)

  // Updating the local storage whenever 
  // the login state changes
  /* السابق قبل التوكن
  useEffect(() => {
    console.log('Login state effect:', login)
    //localStorage.setItem("login", JSON.stringify(login));
    //localStorage.setItem("login", login);
    setLogin(login);
  }, [login]);
*/
 
  // Click Handler updates the login state
  // when the button is clicked
  const click = () => {
   // setLogin((prev) => {
      console.log('dispatch AdminLogOut:')
      dispatch(AdminLogOut())

     // return !prev;
    //})
  }

	return(
    <Container >
        <ToastContainer />
            {
        SignInAdmin ? (
             //children 
             <Row>
             <Col>
             <Stack direction="horizontal" gap={2}>
        
          <Button as="a"  href="/CusomerRequests" variant="success">
            طلبات العملاء
          </Button>
          <Button as="a"  href="/" variant="success">
            الشاشة الرئيسية 
          </Button>
        </Stack>;
        <Container fluid="md" className="container">      
      <Stack  gap={1} className="container mx-auto">
      <Form.Text muted className="text-center">
      <h4>
              أهلا بك في لوحة التحكم
      </h4>
      </Form.Text>
      <div>
    <h1></h1>
    <h4>{userToken}</h4>
    <h4>{statusAdminLogin}</h4>
    </div>
    </Stack>         

</Container>

        <Badge bg="danger" as={Button} onClick={
          () => click()
          } >{SignInAdmin ? "الخروج" : "الدخول"} </Badge >

           </Col>
         </Row>
          ) : 
          
        <Badge bg="danger" as={Button}> hfhffh</Badge >

         // navigate("/Login")
         //history.push("/Login")
         //navigate('/Login', { replace: true })
        }
       </Container> 
        )
  }

export default AdminPage;
