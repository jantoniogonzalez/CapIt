import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import './Home.css';
import NavBar from './NavBar';

const AddPost = (props) =>{
    const [caption, setCaption] = useState("");
    const [postImage, setPostImage] = useState("");
    const [errors, setErrors] = useState([])

    const onChangeHandler = (e) =>{
        setCaption(e.target.value);
    }

    const onChangeFile = (e) =>{
        setPostImage(e.target.files[0]);
    }

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("postImage", postImage);

        axios.post("http://localhost:8000/api/cap-it/posts/new/",
        formData,
        {withCredentials: true})
            .then((res)=>{
                console.log(res);
                navigate("/posts");
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return(
        <div >
            <NavBar/>
            <div className='mainBody1'>
                <form onSubmit = { submitHandler } encType='multipart/form-data' className='whiteContainer'>
                    <label>Image: </label>
                    <input type="file" name='postImage' onChange={onChangeFile}></input>
                    <br/>                        
                    <input type ="text" name="caption" onChange = {onChangeHandler} placeholder='Caption'/>
                    <br/>           
                    <button>Submit Post</button>
                </form>
            </div>
        </div>
    )
}

export default AddPost;