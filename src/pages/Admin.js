import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
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

// Importing toastify module
import { toast,ToastContainer } from "react-toastify";
 
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";



const AdminPage = () => {
  //let history = useHistory();
  const notify = () => toast("Wow so easy!");

  const navigate = useNavigate();
  const getData = async() => {
    await axios.get('http://api.imagemarketing.net/getBuyerRequest',
   ).then((data)=>{
    setBuyerRequests(data.data)
   })
   }
 
   useEffect(async()=> {
     await getData()
  }, [])



 // const [username, setUsername] = useLocalStorage("name", "");
 let [buyerRequests, setBuyerRequests] = useState([])
 let [stateRequest, setStateRequest] = useState([])




/*
  useEffect(() => {
    if (stateRequest == 'Inprogress') {
      <div>
      <ToastContainer  transition={Slide} autoClose={2000} />
    </div>
      
    }
  }, [stateRequest])
  */
  const [login, setLogin] = useLocalStorage("login", "false");
  console.log('login getLogin:', login)
  /*
    // useState hook to keep track of the login state
    const [login, setLogin] = useState(() => {
      //return JSON.parse(localStorage.getItem("login"));
      const login = JSON.parse(localStorage.getItem("login"));
      console.log('login getLogin:', login)
      //console.log('typeof',typeof login)
      return login
    });
*/
  // Updating the local storage whenever 
  // the login state changes
  useEffect(() => {
    console.log('Login state effect:', login)
    //localStorage.setItem("login", JSON.stringify(login));
    //localStorage.setItem("login", login);
    setLogin(login);
  }, [login]);


  //const loginlocal = JSON.parse(localStorage.getItem("login"));
  //console.log('Login loginlocal:', loginlocal)
  //const login = Boolean(localStorage.getItem("login"))
  //console.log('login effect:', login)
  //login = Boolean(login)
  //console.log('login Boolean:', login)

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
               {
                 buyerRequests.map((val)=>{
                 // setBuyerShopName(val.buyerShopName)  
                 // setStateRequest(val.stateRequest)
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
                    <Button onClick={notify}>Notify!</Button>

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
