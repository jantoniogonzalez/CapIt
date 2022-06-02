import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import './Home.css';
import NavBar from './NavBar';

const OneUser = (props)=>{

    const {userId} = props;
    const [postsByUser, setPostsByUser] = useState([])


    useEffect(()=>{
        axios.get("http://localhost:8000/api/cap-it/user/posts/" + userId)
            .then((res)=>{
                console.log(res.data);
                setPostsByUser(res.data);
            })
            .catch((err)=>console.log(err))
    }, [])

    return(
        <div>
            <NavBar/>
            <h3>Posts by: {userId}</h3>
            {postsByUser.map((onePost, index)=>(
                <div key={index}>
                    <p>{onePost.caption}</p>
                    <img src={require("../imagesPosts"+onePost.postImage).default} alt={onePost.postImage}/>
                </div>
            ))}
        </div>
    )
}

export default OneUser;