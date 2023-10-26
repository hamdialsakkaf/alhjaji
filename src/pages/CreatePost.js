import React,{useState} from 'react';
//import Axios from 'axios';
import  Axios  from '../config';
import '../App.css'

function CreatePost() {
    const [userName, setUserName] = useState("")
    const [title, setTitle] = useState("")
    const [text,setText] = useState("");

const submitPost = () => {
    // for shared server api
    Axios.post('https://alhjaji.com/server/api/create',{ mode: 'cors' }, {userName:userName, title: title, text: text})
    //Axios.post('http://localhost:3002/api/create', {userName:userName, title: title, text: text})

}
    return (
        <div className='CreatePost'>
            <div className='uploadPost'>
                <label>UserName:</label>
                <input type='text' onChange={(e) => {
                    setUserName(e.target.value)
                }} />
                  <label>Title:</label>
                <input type='text' onChange={(e) => {
                    setTitle(e.target.value)
                }} />

                <textarea onChange={(e)=>{
                 setText(e.target.value)
                }}>
            </textarea>
            </div>
        <button onClick={submitPost}>Submit Post</button>

        </div>
    )
}

export default CreatePost
