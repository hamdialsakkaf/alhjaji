import React,{useEffect, useState} from 'react';
import axios from 'axios';
//import  Axios  from '../config';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import '../App.css'

function CreateTire() {
    const [brandname, setBrandName] = useState("")
    const [tiresize, setTireSize] = useState("")
    const [imageurl,setImageUrl] = useState("");
    const [Maxload,setMaxload] = useState("");
    const [MaxSpeed,setMaxSpeed] = useState("");
    const [Depthoftread,setDepthoftread] = useState("");
    const [Rollingresistance,setRollingresistance] = useState("");
    const [Wetgripclass,setWetgripclass] = useState("");
    const [noiseClass,setnoiseClass] = useState("");
    const [price,setprice] = useState();
    const [MadeIn,setMadeIn] = useState();
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        emptyFilds()
    },[msg])

    const emptyFilds = (()=> {
        setBrandName("")
        setTireSize("")
        setImageUrl("")
        setMaxload("")
        setMaxSpeed("")
        setDepthoftread("")
        setRollingresistance("")
        setWetgripclass("")
        setnoiseClass("")
        setprice("")
        //setMsg("")
    })
    
const submitTire = async (e) => {
    e.preventDefault();
   
    const tire = {
        brandname: brandname,
        tiresize: tiresize,
        imageurl: imageurl,
        Maxload: Maxload,
        MaxSpeed: MaxSpeed,
        Depthoftread: Depthoftread,
        Rollingresistance: Rollingresistance,
        Wetgripclass: Wetgripclass,
        noiseClass: noiseClass,
        price: price
    }
    await axios.post('https://api.imagemarketing.net/createtire',
        tire 
     )
     .then((res)=> {
        //console.log('succes save tire')
        setMsg('تم اضافة الإطار بنجاح ')
        //emptyFilds()
    })
    .catch( (error) => {
        setMsg('حصلت مشكلة في الادخال')
    }  
    )
    //Axios.post('https://alhjaji.com/server/api/createtire',{ mode: 'cors' }, {brandname:brandname, tiresize: tiresize, imageurl: imageurl,Maxload:Maxload,MaxSpeed:MaxSpeed,Depthoftread:Depthoftread,Rollingresistance:Rollingresistance,Wetgripclass:Wetgripclass,noiseClass:noiseClass, price:price})
     
}
    return (
        <div className="MainPage">
            <div className='PostContainer'>
            <h4>
                  <Badge bg="secondary">{msg}</Badge>
              </h4>
               <Form>
             
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Brand Name"
                            className="mb-3"
                        >
                        <Form.Control placeholder="GT" value={brandname}  onChange={(e) => {
                            setBrandName(e.target.value)
                            }} />
                       </FloatingLabel>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Tire Size"
                            className="mb-3"
                        >
                    <Form.Control placeholder="195/65R17" value={tiresize}  onChange={(e) => {
                    setTireSize(e.target.value)
                }} />
                    </FloatingLabel>

                </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Image Url"
                            className="mb-3"
                        >
                    <Form.Control placeholder="Image Url" value={imageurl}  onChange={(e) => {
                    setImageUrl(e.target.value)
                }} />
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Maxload</Form.Label>
                    <Form.Control placeholder="000 كجم" value={Maxload}  onChange={(e) => {
                    setMaxload(e.target.value)
                }} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>MaxSpeed</Form.Label>
                    <Form.Control value={MaxSpeed} placeholder="Max Speed"  onChange={(e) => {
                    setMaxSpeed(e.target.value)
                }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Depthoftread</Form.Label>
                    <Form.Control value={Depthoftread} placeholder="Depth of tread" onChange={(e) => {
                    setDepthoftread(e.target.value)
                }} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Rollingresistance</Form.Label>
                    <Form.Control value={Rollingresistance} placeholder="Rolling resistance" onChange={(e) => {
                    setRollingresistance(e.target.value)
                }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Wetgripclass</Form.Label>
                    <Form.Control  value={Wetgripclass} placeholder="Wet grip class" onChange={(e) => {
                    setWetgripclass(e.target.value)
                }} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>noiseClass</Form.Label>
                    <Form.Control value={noiseClass} placeholder="noise Class" onChange={(e) => {
                    setnoiseClass(e.target.value)
                }}  />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={price} placeholder="Price" onChange={(e) => {
                    setprice(e.target.value)
                }}  />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>MadeIn</Form.Label>
                    <Form.Control value={MadeIn} placeholder="Made In" onChange={(e) => {
                    setMadeIn(e.target.value)
                }}  />
                    </Form.Group>
                </Row>


                <Button variant="primary" type="button"  onClick={submitTire}>
                    حفظ
                </Button>
                </Form>

            </div>
      
        </div>
    )
}

export default CreateTire
