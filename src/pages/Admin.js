import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const AdminPage = () => {
  //let history = useHistory();
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
                    
                  //const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  const url ='https://wa.me/967775955150?text='+' من فضلك احتاج شراء اطار ماركة' +val.buyer_id+ ' المقاس:'+ val.buyer_id 
                  + 'والمسعر بقيمة:'+ val.price  + 'دولار'
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

                  <Card.Img variant="top" src={val.itemNo}  />
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                اطارات    {val.itemNo }
                     </Badge>
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${val.itemNo}`))}>{val.itemNo}</h1>       
                     </Card.Title>
                    <Card.Text>
                   
                    <h3>
                     <Badge bg="secondary">{val.itemNo} </Badge> دولار
                </h3>
                    </Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush" bg="danger">
                 
                  <ListGroup.Item>
                  <div className="vr" />
                  <Button variant="outline-danger" onClick={yemeniRials}>اضغط هنا للسعر بالريال</Button>
                    {DolarexchangeRial} سعر الصرف
                   <h5>
                ريال <Badge bg="secondary">{productrialprice = (DolarexchangeRial * val.price)} </Badge> 
                </h5></ListGroup.Item>
                <div> </div> 
                </ListGroup>
                <div> </div> 
                <Button as="a" variant="danger" size="lg" href={url} target='_blank'>
                       شراء
                    </Button>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                   
                      <tr>
                        <th>اقصى حمولة</th>
                        <th> اقصى سرعة</th>
                        <th>عمق الدعسة</th>
                        <th>تصنيف التدحرج</th>
                        <th>تصنيف القبضة الرطبة</th>
                        <th>تصنيف الضجيج </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{val.itemNo}</td>
                        <td>{val.itemNo}</td>
                        <td>{val.itemNo}</td>
                        <td>{val.product}</td>
                        <td>{val.quantity}</td>
                        <td>{val.quantity}</td>
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
