import React,{useState,useEffect} from 'react'
//import Axios from  'axios'
import  Axios  from '../config';
//import {useNavigate} from 'react-router-dom'
import { useParams,useLocation,useNavigate    } from "react-router-dom";

import '../App.css'

function MainPage() {
    const [postList, setPostList]=useState([]);
    //let history = useNavigate();
    const navigate = useNavigate();

    useEffect(()=> {
        //Axios.get("http://localhost:3002/server/api/get").then((data)=> {
        Axios.get("https://api.alhjaji.com/get",{
            mode: 'cors',
            headers: {
             "Content-Type": "application/json",
         },
           }).then((data)=> {

       
            setPostList(data.data)
        })
    },[])

    const LikePost = (id) => {
        //Axios.post(`http://localhost:3002/server/api/like/${id}`).then((response)=> {
        Axios.post(`https://api.imagemarketing.net/like/${id}`,{
            mode: 'cors',
            headers: {
             "Content-Type": "text/html",
         },
           }).then((response)=> {

            //alert('you liked a post')
        })
    };

    return (
        <div className="MainPage">
        <div className="PostContainer">
          { //postList.map((val,key)=>{
          postList && postList.map((val,key)=>{
            return (
             <div className="Post" >
              <h1 className="post-title" onClick={()=>(navigate(`/post/${val.id}`))}>{val.title}</h1>
               <p>{val.post_text.length > 300 ? val.post_text.substring(0,300)+ " ..." : val.post_text}</p>
               <h4>{val.userName}</h4>
            <button className="like_btn" onClick={(() => LikePost(val.id))}>Like</button>
   
              <h5>Likes: {val.likes}</h5>
               </div>
              )  })}  
             </div>
           </div>
    )
}

export default MainPage
