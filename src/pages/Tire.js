import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
//import Axios from 'axios'
import axios from 'axios';
//import  Axios  from '../config';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';

export default function Tire() {
let {tireId} = useParams();
const [tire,setTire] = useState({})
useEffect(()=>{
  axios.get(`http://api.imagemarketing.net/getFromTireId/${tireId}`).then((data)=>{
    console.log(data)
    setTire({
        id:data.data[0].id,
        tiresize: data.data[0].TireSize,
         brandname: data.data[0].brandname,
         imageUrl: data.data[0].image,
         Maxload: data.data[0].Maxload,
         MaxSpeed: data.data[0].MaxSpeed,
         Depthoftread: data.data[0].Depthoftread,
         Rollingresistance: data.data[0].Rollingresistance,
         Wetgripclass: data.data[0].Wetgripclass,
         noiseClass: data.data[0].noiseClass,
         price: data.data[0].price,
         image: data.data[0].image,

        });
 });
},[tireId]);
const deletePost = (id) => {
  axios.delete(`http://api.imagemarketing.net/deleteTire/${tireId}`).then((response)=>{
        alert("you deleted a tire")
    })
}
    return (
      <Container>
         <Row>
             <Col sm={4}>
                  <Card  key={tire.id } bg="primary" sm={4}>
                  <Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <Badge bg="warning" text="dark">
                اطارات    {tire.brandname }
                     </Badge>
                     </Card.Title>
                     <h1 className="post-title">{tire.tiresize}</h1>
          <h4>{tire.brandname}</h4>
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
                        <td>{tire.Maxload}</td>
                        <td>{tire.MaxSpeed}</td>
                        <td>{tire.Depthoftread}</td>
                        <td>{tire.Rollingresistance}</td>
                        <td>{tire.Wetgripclass}</td>
                        <td>{tire.noiseClass}</td>
                      </tr>
                    </tbody>
                  </Table>
                    <Card.Text>
                    <h3>
                     <Badge bg="secondary">{tire.price} </Badge> دولار
                </h3>
                    </Card.Text>
                  </Card.Body>
                  <Card.Img variant="top" src={tire.image}  />

                  </Card>
                  <Button as="a"  href="/" variant="success">
                   رجوع
          </Button>
          </Col>
          </Row>
      </Container>
    )
}