import React,{useState,useEffect, useCallback } from 'react'
import axios from 'axios';
//import Axios from  'axios'
//from vedio
//import  Axios  from '../config'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import '../App.css'
//Axios.defaults.baseurl = process.env.react_app_be_url;

function HomePage() {
  const [error, setError] = useState(null);

    let [tire, setTire] = useState("⬇️ Select a tire ⬇️")
    let [tiresize, setTireSize] = useState("⬇️ Select a tire Size ⬇️")
    const [tireList, setTireList]=useState([]);

    let [tiresOnSize, setTireOnSize] = useState([])
    let [DolarexchangeRial, setDolarexchangeRial] = useState()
    let [productprice, setProductPrice] = useState()
    let [productrialprice, setProductRialPrice] = useState(productprice * DolarexchangeRial)

    //let history = useNavigate();
    const navigate = useNavigate();

  //const response = await Axios.request(config);
  
    useEffect(()=> {
       axios.get('http://localhost:5000/api/getire',
        //{headers: {'content-type': 'application/x-www-form-urlencoded'}}
      ).then((data)=>{
        setTireList(data.data)

      })

    },[])
    
  //}
        useEffect(()=>{
          axios.get(`http://localhost:5000/api/getFromTireSize/${tiresize}`).then((data)=>{
            //axios.get(`https://alhjaji.com/server/api/getFromTireSize/${tiresize}`, {
              //mode: 'cors',
              //headers: { "Content-Type": "application/json","charset":"utf-8" },
              setTireOnSize(data.data)
        })
          },[tiresize])

        const yemeniRials = ()=> {
          axios.get(`http://localhost:5000/api/getexchangeDolar`).then((data)=>{
            //axios.get(`https://alhjaji.com/api/getexchangeDolar`, {
             //axios.get(`https://api.alhjaji.com/api/getexchangeDolar`, {

            //mode: 'cors',
           // headers: { "Content-Type": "application/json","charset":"utf-8" },
            //Content-Type: application/x-javascript;charset=utf-8

           //}).then((data)=>{

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
      <div className="MainPage">

      <Container className='PostContainer'>         
        <h4>
            <Badge bg="secondary"> اختر مقاس اطار سيارتك من القائمة وقارن المواصفات والأسعار
      </Badge>        
        </h4>
                     
        <Form.Select size="lg" onChange={handleTireSizeChange}>
        <option value="⬇️ Select a Tire Size ⬇️"> -- اختر مقاس الإطار -- </option>
        <option value='195r14'>195r14</option>
        <option value='195r15'>195r15</option>
        <option value='185r15'>185r15</option>
        <option value='185R15'>185R15</option>
        <option value='185R14'>185R14</option>
        <option value='165-65R15'>165/65R15</option>
        <option value='215-65R16'>215/65R16</option>
        <option value='205-70R15'>205/70R15</option>
        <option value='205-65R15'>205/65R15</option>

      </Form.Select>
      <Container className='TireContainer'>
               {
                 tiresOnSize.map((val)=>{
                  const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                 + ' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                return(
                  <Container>
                    <Badge bg="warning" text="dark">
                    {val.brandname }
                     </Badge>
                <Card style={{ width: '18rem' }} key={val.id }>
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link href="" >Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#link">Link</Nav.Link>
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
                    {val.brandname }
                     </Badge>
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${val.id}`))}>{val.tiresize}</h1>       
                     </Card.Title>
                    <Card.Text>
                    {val.tiresize}
                    <h3>
                     <Badge bg="secondary">{val.price} </Badge> دولار
                </h3>
                    </Card.Text>
                    <Button as="a" variant="primary" href={url} target='_blank'>شراء </Button>
                  </Card.Body>
                  <ListGroup variant="flush">
                  <h4>
                     <Badge bg="danger" as={Button} onClick={yemeniRials} >السعر باليمني</Badge >
                     </h4>
                  <ListGroup.Item>{DolarexchangeRial} سعر الصرف</ListGroup.Item>
                  <ListGroup.Item> <h5>
                ريال يمني<Badge bg="secondary">{productrialprice = (DolarexchangeRial * val.price)} </Badge> 
                </h5></ListGroup.Item>
                  <ListGroup.Item> <Button as="a" variant="primary" href={url} target='_blank'>
                       شراء
                    </Button>
                    </ListGroup.Item>
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

                  </Container>            
      
                   )
                })              
               }
           </Container>            

              <h4>
                     <Badge bg="danger"  >اطارات اخرى</Badge >
                     </h4>
                     <h4>
                     <Badge bg="danger"  > {error}</Badge >
                     </h4>

           <Container className='TireContainer'>

           {//tireList.map((val)=>{
             // Array.isArray(tireList) ?
                 tireList.map((val)=>{
                   const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                   + ' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
            return (
             
              <Card style={{ width: '18rem' }} key={val.id} >
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link href="" >Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#link" onClick={()=>(navigate(`/tire/${val.id}`))}>مواصفات</Nav.Link>
                    </Nav.Item>
                 
                  </Nav>
             </Card.Header>
                  <Card.Img variant="top" src={val.image}  />
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                    {val.brandname }
                     </Badge>
                     <h1 className="post-title" onClick={()=>(navigate(`/tire/${val.id}`))}>{val.tiresize}</h1>       
                     </Card.Title>

                    <Card.Text>
                    {val.tiresize}
                    <h3>
                     <Badge bg="secondary">{val.price} </Badge> دولار
                   </h3>
                    </Card.Text>
                    <Button as="a" variant="primary" href={url} target='_blank'>شراء </Button>
                  </Card.Body>
                  <ListGroup variant="flush">
                  <h4>
                     <Badge bg="danger" as={Button} onClick={yemeniRials} >السعر باليمني</Badge >
                     </h4>
                     <h4>
                     <Badge bg="danger" as={Button} > 0</Badge >Likes:
                     </h4>
                  <ListGroup.Item>{DolarexchangeRial} سعر الصرف</ListGroup.Item>
                  <ListGroup.Item> <h5>
                ريال يمني<Badge bg="secondary">{productrialprice = (DolarexchangeRial * val.price)} </Badge> 
                </h5></ListGroup.Item>
                  <ListGroup.Item> <Button as="a" variant="primary" href={url} target='_blank'>
                       شراء
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
   
              ) })
               // : null

              } 
         </Container>            

</Container>
</div>
    )
}

export default HomePage
