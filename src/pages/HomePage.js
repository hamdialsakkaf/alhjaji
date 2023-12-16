import React,{useState,useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
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
import '../App.css';
//Axios.defaults.baseurl = process.env.react_app_be_url;
  const HomePage = () => {

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

    const navigate = useNavigate()

    useEffect(()=>  {
      axios.get('http://api.imagemarketing.net/getire',
    ).then((res)=>{
      setTireList(res.data);
    })
    },[])
    
    const getData = () => {
      axios.get('http://api.imagemarketing.net/getire',
    ).then((data)=>{
      setTireList(data.data)
    })
    }
  
    useEffect(()=> {
      getData()
   }, [])
  
      window.addEventListener("beforeunload", (event)=> {
        getData()
      })
      window.addEventListener("load", (event) => {
        getData()
      })
  //}
        useEffect(()=>{
          //axios.get(`https://api.alhjaji.com/getFromTireSize/${tiresize}`).then((data)=>
          axios.get(`http://api.imagemarketing.net/getFromTireSize/${tiresize}`).then((res)=>
          {
            setTireOnSize(res.data);
        })
          },[tiresize])

        const yemeniRials = ()=> {
          axios.get(`http://api.imagemarketing.net/getexchangeDolar`).then((data)=>{
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

      <Container fluid="md">         
        <h4>
            <Badge bg="secondary"> اختر مقاس اطار سيارتك من القائمة وقارن المواصفات والأسعار
      </Badge>        
        </h4>        
        <Form.Select size="lg" onChange={handleTireSizeChange}>
        <option value="⬇️ Select a Tire Size ⬇️"> -- اختر مقاس الإطار -- </option>
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
      <Container>
        <Row>
               {
                 tiresOnSize.map((val)=>{
                    
                  //const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  const url ='https://wa.me/967772911888?text='+' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                  + 'والمسعر بقيمة:'+ val.price  + 'دولار'
                  return(
                  <Col sm={4} >
                 
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
                  <h4>
                     <Badge bg="danger" as={Button} onClick={yemeniRials} >اضغط هنا للسعر بالريال</Badge >
                     </h4>
                    {DolarexchangeRial} سعر الصرف
                   <h5>
                ريال <Badge bg="secondary">{productrialprice = (DolarexchangeRial * val.price)} </Badge> 
                </h5></ListGroup.Item>
                <div> </div> 
                </ListGroup>
                <div> </div> 
                <Button as="a" variant="primary" size="lg" href={url} target='_blank'>
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
                 //  const url ='https://web.whatsapp.com/send?phone=967775955150&text='
                  // + ' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                   const url ='https://wa.me/967772911888?text='+' من فضلك احتاج شراء اطار ماركة' +val.brandname+ ' المقاس:'+ val.tiresize 
                   + 'والمسعر بقيمة:'+ val.price  + 'دولار'
            return (
             <Col sm={4}>
              <Card 
              key={val.id} 
              sm={4}
                bg="primary"
                text='white'
              // border="warning" 
              >
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link  href="#link" onClick={()=>(navigate(`/tire/${val.id}`))}>مواصفات</Nav.Link>
                    </Nav.Item>
                  </Nav>
             </Card.Header>
                  <Card.Img variant="top" src={val.image}  />
                  <Card.Body>
                    <Card.Title><Badge bg="warning" text="dark">
                    اطار {val.brandname } 
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
                     <Badge bg="danger" as={Button} onClick={yemeniRials} >السعر بالريال</Badge >
                     </h4>
                     <h4>
                     <Badge bg="danger" as={Button} > 0</Badge >Likes:
                     </h4>
                  <ListGroup.Item>{DolarexchangeRial} سعر الصرف</ListGroup.Item>
                  <ListGroup.Item> <h5>
                ريال يمني<Badge bg="secondary">{productrialprice = (DolarexchangeRial * val.price)} </Badge> 
                </h5></ListGroup.Item>
                  <Button as="a" variant="primary" size="lg" href={url} target='_blank'>
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
