import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
//import Axios from 'axios'
import  Axios  from '../config';
import Table from 'react-bootstrap/Table';

import '../App.css'

export default function Tire() {

let {tireId} = useParams();
const [tire,setTire] = useState({})

useEffect(()=>{
Axios.get(`http://localhost:5000/api/getFromTireId/${tireId}`).then((data)=>{
    console.log(data)
    setTire({
        id:data.data[0].id,
        tiresize: data.data[0].TireSize,
         brandname: data.data[0].BrandName,
         imageUrl: data.data[0].image,
         Maxload: data.data[0].Maxload,
         MaxSpeed: data.data[0].MaxSpeed,
         Depthoftread: data.data[0].Depthoftread,
         Rollingresistance: data.data[0].Rollingresistance,
         Wetgripclass: data.data[0].Wetgripclass,
         noiseClass: data.data[0].noiseClass,

        });
 });

},[tireId]);

const deletePost = (id) => {
    Axios.delete(`http://localhost:5000/api/deleteTire/${tireId}`).then((response)=>{
        alert("you deleted a tire")
    })
}


    return (
        <div className="Post individual">
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
          <button onClick={(() => deletePost(tire.id))}>X</button>
          
      </div>
    )
}