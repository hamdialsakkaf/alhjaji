import React,{useState,useEffect } from 'react'
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useLocation,useNavigate,Navigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import { FloatingLabel } from 'react-bootstrap';

import '../App.css';
// Importing toastify module
 
// Import toastify css file
import io from 'socket.io-client';

import { CustomerLogOut,Customerlogin } from '../redux/slices/CustomersSlice';
//Axios.defaults.baseurl = process.env.react_app_be_url;
  const HomePage = () => {
    let socket = io("http://localhost:3000");
    //Now Listen for Events (welcome event).
    socket.on("welcome", (data) => {
      /*For the listener we specify the event name and we give the callback to which be called one the 
      event is emitted*/
      //Log the Welcome message 
      console.log("Message: ", data);
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getCustomerInfo = useSelector((state) => state.CustomerAccount)
    const { SignIn, statusLogin,CustomerToken, errorLogin,CustomerEmail,phoneNumber } = getCustomerInfo

    const getAdminInfo = useSelector((state) => state.AdminAccount)
    const { userToken, userInfo, SignInAdmin,statusAdminLogin,permissionAdmin } = getAdminInfo
    
    console.log('homepage CustomerToken..',CustomerToken)
    const [time, setTime] = useState('fetching')  
  
    useEffect(()=>{
      try {
        console.log('starting socket in client..')
        /*
        const socket = io('http://localhost:5000', {
          //withCredentials: true,
          extraHeaders: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        */
       // io.on('connect', ()=>console.log(socket.id))
    
        socket.on('connect_error', ()=>{
          setTimeout(()=>socket.connect(),3000)
        })
      
        //socket.on('newBuerRequest', (data)=>setTime(data))
        socket.on('newBuerRequest', (data)=>{
          setTime(data)
          console.log('setTime:',data);

      })

      socket.on('time', (data)=>setTime(data))
      socket.on('disconnect',()=>setTime('server disconnected'))
      } catch (error) {
        console.log('Socket error Client:',error)
      }
    
  
  },[])

//function HomePage() {
  //const [error, setError] = useState(null);
  const [error] = useState(null);
    let [tire, setTire] = useState("⬇️ Select a tire ⬇️")
    let [tiresize, setTireSize] = useState("⬇️ Select a tire Size ⬇️")
    let [tireList, setTireList]=useState([]);
    let [tiresOnSize, setTireOnSize] = useState([])
    let [DolarexchangeRial, setDolarexchangeRial] = useState()
    let [productprice, setProductPrice] = useState()
    let [productrialprice, setProductRialPrice] = useState(productprice * DolarexchangeRial)
    //let [tirelogo, setTireLogo] = useState("")
    //const hankkokLogo = "https://logonoid.com/images/hankook-logo.png"


    //console.log(' loginCustomer:', loginCustomer)
 
    // Updating the local storage whenever 
    // the login state changes
    
 
    // Click Handler updates the login state
    // when the button is clicked
 
    useEffect(()=>{
      
      if(SignIn) {
         navigate('/')
      } else {
          navigate('/customerlogin')
      }
      
  },[])
  

  /*
      Axios.get("https://api.alhjaji.com/get",{
            mode: 'cors',
            headers: {
             "Content-Type": "application/json",
         },
           }).then((data)=> {

       
            setPostList(data.data)
        })
  */
    
        const user = {
          userToken : userToken
        }

    const getData = async () => {
      const headers = { 'Authorization': `Bearer ${CustomerToken}` };
      
      try {
        axios.get("http://localhost:5000/getire",{headers})
        .then((res)=> {
          setTireList(res.data)
          //console.log('responseData:',res.data)

      })
  
      } catch (error) {
        // Handle error
        console.error(error);
      }
      
    }

    const fitchTiresFromTireSize = (size) => {
      try {
        axios.get(`http://localhost:5000/getFromTireSize/${size}`,{
        
         }).then((res)=> {
          setTireOnSize(res.data)
          console.log('setTireOnSize:',res.data)

      })
      } catch (error) {
        // Handle error
        console.error('fitchTiresFromTireSize error',error);
      }
    }

  
    useEffect(()=> {
       getData()
   }, [])
        /*
      window.addEventListener("beforeunload", (event)=> {
        getData()
      })
      */
      window.addEventListener("load", (event) => {
        getData()
      })
  //}
        useEffect(()=>{
          fitchTiresFromTireSize(tiresize)
          },[tiresize])
          
        const yemeniRials = ()=> {
          axios.get(`http://localhost:5000/getexchangeDolar`).then((data)=>{
            setDolarexchangeRial(data.data[0].DolarexchangeRial);
            setProductRialPrice(productprice * DolarexchangeRial)
         })
        }

    // whenever a new option is selected from the dropdown
let handleTireSizeChange = (e) => {
  setTireSize(e.target.value)
  //console.log('tire Change:', tire)
}

    return (
      <div>
      <Container fluid="md" className="container">      
      <Stack  gap={1} className="container mx-auto">
    
      
      <Form.Text muted className="text-center">
      <h4>
      أهلاً بك في شركة الحجاجي للتجارة العامة - أجتكو 
      </h4>
      <h4>اختر مقاس اطار سيارتك من القائمة ادناه لتحصل على تفاصيل أكثر 
      </h4>
      </Form.Text>
      {time}
      {userToken}
      <div>
    <h1></h1>
    </div>
    </Stack>
        <FloatingLabel controlId="floatingSelect" label="اختر مقاس اطار سيارتك من القائمه">
        <Form.Select size="lg" onChange={handleTireSizeChange}>
        <option> -- مقاس الإطار -- </option>
        <option value='155r12'>155R12</option>
        <option value='155R13'>155R13</option>
        <option value='165-65R13'>165/65R13</option>
        <option value='175-60R13'>175/60R13</option>
        <option value='175-65R13'>175/65R13</option>
        <option value='175-70R13'>175/70R13</option>
        <option value='165-80R13'>165/80R13</option>
       
        <option value='165-65R14'>165/65R14</option>
        <option value='165-70R14'>165/70R14</option>
        <option value='175-65R14'>175/65R14</option>
        <option value='185-70R14'>185/70R14</option>

        <option value='165-60R15'>165/60R15</option>
        <option value='185-65R15'>185/65R15</option>
        <option value='195-60R15'>195/60R15</option>
        <option value='195-55R15'>195/55R15</option>
        <option value='205-60R15'>205/60R15</option>
        <option value='205-65R15'>205/65R15</option>
        <option value='215-65R15'>215/65R15</option>
        
        <option value='195-55R16'>195/55R16</option>
        <option value='205-60R16'>205/60R16</option>
        <option value='215-60R16'>215/60R16</option>

        
        <option value='225-45R17'>225/45R17</option>
        <option value='235-45R17'>235/45R17</option>
        <option value='245-40R17'>245/40R17</option>
        <option value='245-45R17'>245/45R17</option>

        
        <option value='265-65R17'>265/65R17</option>

      </Form.Select>
    </FloatingLabel>

      <Container>
        <Row>
               {
                

                 tiresOnSize.map((val)=>{
                  const {id, tiresize, brandname, image,price} = val;
                  const path = `checkout/${price}/product/${tiresize}`
                  
                  //const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  const url ='https://wa.me/967775955150?text='+' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                  + 'والمسعر بقيمة:'+ val.price  + 'دولار'
                  return(
                  <Col sm={4} xs="auto">
                 
                    <Badge bg="warning" text="dark">
                    {val.brandname }
                  
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

                  <Card.Img variant="top" src={val.image}  />
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                اطارات    {val.brandname }
                     </Badge>
                
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${val.id}`))}>{val.tiresize}</h1>       
                     </Card.Title>
                    <Card.Text>
                   
                    <h3>
                     <Badge bg="secondary">{val.price} </Badge> دولار
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
                      شراء واتس اب
                    </Button>
                    <div>
                    </div> 
                    
                  <Button as="a" href={`checkout/${price}/product/${tiresize}`} target="_blank" variant="primary">
                    شراء
                  </Button>
                  <Button href={`checkout/${price}/product/${tiresize}`}>شراء</Button> 
               <div>
            </div>

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
                        <td>{val.Maxload}</td>
                        <td>{val.MaxSpeed}</td>
                        <td>{val.Depthoftread}</td>
                        <td>{val.Rollingresistance}</td>
                        <td>{val.Wetgripclass}</td>
                        <td>{val.noiseClass}</td>
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
               <div>
               <h4>
              <Badge bg="danger"  >اطارات اخرى</Badge >
              </h4>
               </div>
           <Container>
            <Row>
                <h4>
                   <Badge bg="danger"  > {error}</Badge >
                   </h4>
           {//tireList.map((val)=>{
             // Array.isArray(tireList) ?
                 tireList.map((val)=>{
                  const {id, tiresize, brandname, image,price} = val;

                 //  const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  // + ' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                   const url ='https://wa.me/967775955150?text='+' من فضلك احتاج شراء اطار ماركة' +brandname+ ' المقاس:'+ val.tiresize 
                   + 'والمسعر بقيمة:'+ price  + 'دولار'
            return (
             <Col sm={4} xs="auto">
              <Card 
              key={id} 
              sm={4}
                bg="primary"
                text='white'
              // border="warning" 
              >
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link  onClick={()=>(navigate(`/tire/${id}`))}>مواصفات</Nav.Link>
                    </Nav.Item>
                  </Nav>
             </Card.Header>
                  <Card.Img variant="top" src={image}  />
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                    اطار {brandname } 
                     </Badge>
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${id}`))}>{tiresize}</h1>       
                     </Card.Title>

                    <Card.Text>
                    {tiresize}
                    <h3>
                     <Badge bg="secondary">{price} </Badge> دولار
                   </h3>
                    </Card.Text>
                    <Button as="a" variant="primary" href={url} target='_blank'>شراء </Button>
                  </Card.Body>
                  <ListGroup variant="flush">
                     <h4>
                     <Badge bg="danger" as={Button} > 0</Badge >Likes:
                     </h4>
                  <ListGroup.Item>{DolarexchangeRial} سعر الصرف</ListGroup.Item>
                  <ListGroup.Item> 
                  <Button variant="outline-danger" onClick={yemeniRials}>اضغط هنا للسعر بالريال</Button>
                <h5>
                ريال يمني<Badge bg="secondary">{productrialprice = (DolarexchangeRial * price)} </Badge> 
                </h5></ListGroup.Item>
                  <Button as="a" variant="danger" size="lg" href={url} target='_blank'>
                       شراء
                    </Button>
                </ListGroup>
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
                        <td>{val.Maxload}</td>
                        <td>{val.MaxSpeed}</td>
                        <td>{val.Depthoftread}</td>
                        <td>{val.Rollingresistance}</td>
                        <td>{val.Wetgripclass}</td>
                        <td>{val.noiseClass}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
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

export default HomePage;
