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
import { getBuyerRequests, setInprogressRequset } from "../redux/slices/getBuyerRequestSlice";

const AdminPage = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);


  const navigate = useNavigate();

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
      const socket = io('https://api.imagemarketing.net', {
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

     // Get the gtTires from the store
     const getbuyerRequestsState = useSelector((state) => state.buyerRequests)
     const { buyerRequests, statusBR, errorGt } = getbuyerRequestsState

  //console.log('buyerRequests:', buyerRequests)
  //console.log(' buyerRequests.stateRequest:',  buyerRequests.stateRequest)
  const [ buyerShopName,setBuyerShopName  ] = useState('')
  const [ requestid,setRequestid  ] = useState('')
  let [stateRequest, setStateRequest] = useState('')

  const reqDetaile = {
    requestid: requestid,
    buyerShopName:buyerShopName
  }


     useEffect(() => {
      // eslint-disable-next-line no-unused-vars
      let isMounted = true
  
      // If status is 'idle', then fetch the posts data from the API
      if (statusBR === 'idle') {
        dispatch(getBuyerRequests())
      }
      // Cleanup function
      return () => {
        isMounted = false
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusBR, dispatch])


 // const [username, setUsername] = useLocalStorage("name", "");


  const [login, setLogin] = useLocalStorage("login", "false");
  console.log('login getLogin:', login)

  // Updating the local storage whenever 
  // the login state changes
  useEffect(() => {
    console.log('Login state effect:', login)
    //localStorage.setItem("login", JSON.stringify(login));
    //localStorage.setItem("login", login);
    setLogin(login);
  }, [login]);

  // Click Handler updates the login state
  // when the button is clicked
  const click = () => {
    setLogin((prev) => {
      console.log('login prev:', prev)

      return !prev;
    });
  }
 
	return(
    <Container>
        <ToastContainer />
            {
        login ? (
             //children 
             <Row>
             <Col>
             <Stack direction="horizontal" gap={2}>
          <Button as="a" href="/createpost" variant="primary">
              createpost
          </Button>
          <Button as="a"  href="/CreateTire" variant="success">
            CreateTire
          </Button>
        </Stack>;
        <Container fluid="md" className="container">      
      <Stack  gap={1} className="container mx-auto">
      <Form.Text muted className="text-center">
      <h4>
      أهلاً بك في شركة الحجاجي للتجارة العامة - أجتكو 
      </h4>
      <h4>اختر مقاس اطار سيارتك من القائمة ادناه لتحصل على تفاصيل أكثر 
      </h4>
      </Form.Text>
      <div>
    <h1></h1>
    </div>
    </Stack>
  
      <Container>
        <Row>
              <Form.Text muted className="text-center">
                <h4>
                    طلب جديد من:  
                </h4>
                <h4>{newBuerRequest}
                </h4>
                </Form.Text>
               {
                 buyerRequests.map((val)=>{
                 // setBuyerShopName(val.buyerShopName)  
                  //setStateRequest(val.stateRequest)
                
                  //const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  const url ='https://wa.me/967775955150?text='+' من فضلك احتاج شراء اطار ماركة' +val.buyer_id+ ' المقاس:'+ val.q 
                  + 'والمسعر بقيمة:'+ val.product  + 'دولار'
                  return(
                  <Col sm={4} xs="auto">
                 
                    <Badge bg="warning" text="dark">
                    {val.buyer_id }
                  
                     </Badge>
                <Card  key={val.id } bg="primary" sm={4}>
                <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link  href="#link" onClick={()=>(navigate(`/tire/${val.id}`))}>مواصفات</Nav.Link>
                    </Nav.Item>
                  
                    <Nav.Item>
                      <Nav.Link href="#disabled" disabled>
                        Disabled
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
             </Card.Header>
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                طلب شراء   
                     </Badge>
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${val.buyer_id}`))}>{val.buyer_id}  {val.buyerShopName}</h1>   
                      
                     </Card.Title>
                    <Card.Text>
                  
                    <h3>
                     <Badge bg="secondary">{val.product} </Badge> 
                </h3>
                    </Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush" bg="danger">
                 
                  <ListGroup.Item>
                  <div className="vr" />
                   <h5>
             
                </h5></ListGroup.Item>
                <div> </div> 
                </ListGroup>
                <div> </div> 
                <Button as="a" variant="danger" size="lg" href={url} target='_blank'>
                       شراء
                    </Button>
                    <Badge bg="secondary">{val.product} </Badge> 
              
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                   
                      <tr>
                        <th> العميل </th>
                        <th>رقم الصنف</th>
                        <th> الكمية</th>
                        <th> حالةالطلب</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{val.buyer_id}</td>
                        <td>{val.itemNo}</td>
                        <td>{val.quantity}</td>
                        <td>قيد التحقق</td>
                        <td><Button  variant="danger" size="sm" >
                       قيد التنفيذ
                    </Button>

                      </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
               </Col>            
      
                   )
                })              
               }
               </Row>
             
           </Container>            

</Container>

        <Badge bg="danger" as={Button} onClick={
          () => click()
          } >{login ? "Logout" : "Login"} </Badge >
           </Col>
         </Row>
          ) : 
          navigate("/Login")
         //history.push("/Login")
         //navigate('/Login', { replace: true })
        }
       </Container> 
        )
  }

export default AdminPage;
