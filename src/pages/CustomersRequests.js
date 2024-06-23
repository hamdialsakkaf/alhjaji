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
  const CusomerRequests = () => {
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
    const { SignIn, statusLogin, errorLogin,CustomerEmail,phoneNumber } = getCustomerInfo

    const getAdminInfo = useSelector((state) => state.AdminAccount)
    const { userToken, userInfo, SignInAdmin,statusAdminLogin,permissionAdmin } = getAdminInfo
    
    console.log('homepage userToken..',userToken)
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
    //let [tireList, setTireList]=useState([]);
    let [requestsList, setRequestsList]=useState([]);

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
      if(!SignInAdmin) {
          navigate('/adminlogin')
      }
      
  },[SignInAdmin])
  

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
      const headers = { 'Authorization': `Bearer ${userToken}` };
      
      try {
        axios.get("http://localhost:5000/getBuyerRequests",{headers})
        .then((res)=> {
          setRequestsList(res.data)
          //console.log('responseData:',res.data)

      })
  
      } catch (error) {
        // Handle error
        console.error(error);
      }
      
    }
/*
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
*/
  
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
  /*
        useEffect(()=>{
          fitchTiresFromTireSize(tiresize)
          },[tiresize])
        */
        const yemeniRials = ()=> {
          axios.get(`http://localhost:5000/getexchangeDolar`).then((data)=>{
            setDolarexchangeRial(data.data[0].DolarexchangeRial);
            setProductRialPrice(productprice * DolarexchangeRial)
         })
        }

    // whenever a new option is selected from the dropdown
    /*
let handleTireSizeChange = (e) => {
  setTireSize(e.target.value)
  //console.log('tire Change:', tire)
}
*/
    return (
      <div>
      <Container fluid="md" className="container">      
      <Stack  gap={1} className="container mx-auto">
    
      
      <Form.Text muted className="text-center">
      <h4>
    شاشة طلبات العملاء الواردة
      </h4>
      
      </Form.Text>
      {time}
      {userToken}
      <div>
    <h1></h1>
    </div>
    </Stack>
                
               <div>
               <h4>
              <Badge bg="danger"  > الطلبات الأخيرة:</Badge >
              <ListGroup.Item>{DolarexchangeRial} سعر الصرف</ListGroup.Item>

              </h4>
               </div>
           <Container>
            <Row>
                <h4>
                   <Badge bg="danger"  > {error}</Badge >
                   </h4>
           {//tireList.map((val)=>{
             // Array.isArray(tireList) ?
             requestsList.map((val)=>{
                  const {buyer_id, buyerShopName, itemNo, product,quantity} = val;

                 //  const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  // + ' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                   const url ='https://wa.me/967775955150?text='+' من فضلك اهتم بطلب   العميل' +buyerShopName+ ' وطلب هذه البضاعة:'+ product 
                   + ' والكمية:'+ quantity  
            return (
             <Col sm={4} xs="auto">
              <Card 
              key={buyer_id} 
              sm={4}
                bg="primary"
                text='white'
              // border="warning" 
              >
                <Card.Header>
             </Card.Header>
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                    العميل: {buyerShopName } 
                     </Badge>
                     </Card.Title>

                    <Card.Text>
                    {buyerShopName}
                    <h3>
                     <Badge bg="secondary">{itemNo} رقم الصنف:</Badge> 
                     <Badge bg="secondary">{product} المنتج:</Badge> 
                   </h3>
                    </Card.Text>
                    <Button as="a" variant="primary" href={url} target='_blank'>تحويل </Button>
                  </Card.Body>
                  <ListGroup variant="flush">
                     <h4>
                     <Badge bg="danger" as={Button} > 0</Badge >Likes:
                     </h4>
                  <ListGroup.Item> 
               </ListGroup.Item>
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
                        <td></td>
                        <td></td>
                   
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

export default CusomerRequests;
