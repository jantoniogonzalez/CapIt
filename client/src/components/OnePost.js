import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import './Home.css';
import NavBar from './NavBar';

const OnePost = (props)=>{
    const {id} = props;
    const [onePost1, setOnePost1] = useState({
        postImage: "",
        caption : "",
        comments: [],
        postedBy: {}
    });
    const [newComment, setNewComment] = useState({
        text: ""
    });
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cap-it/post/${id}`)
            .then((res)=>{
                console.log(res.data);
                setOnePost1(res.data);
            })
            .catch((err)=>console.log(err))
    }, [])

    const onChangeHandler = (e) =>{
        setNewComment({text: e.target.value});
    }

    const submitComment = (e) =>{
        e.preventDefault();
        axios.put("http://localhost:8000/api/cap-it/posts/"+id,
        newComment,
        {withCredentials: true}
        )
            .then((res)=>{
                console.log(res);
                const newStateObject = {...onePost1};
                newStateObject.comments = [...onePost1.comments, newComment];
                const newStateObject1 = newStateObject.comments.reverse();
                newStateObject.comments = newStateObject1;
                setOnePost1(newStateObject);
                setNewComment({text: ''})
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return(
        <div>
            <NavBar/>
            <div className='mainBody'>
                <div className='middle'>
                    <h3>{onePost1.caption} by <Link to={"/oneUser/"+onePost1.postedBy.id}>{onePost1.postedBy.username}</Link></h3>
                    <img src={require(`../imagesPosts/${onePost1.postImage}`).default} alt={onePost1.postImage} className='postImages'/>
                    <form onSubmit={submitComment}>
                        <input type="text" name="text" value={newComment.text} onChange={onChangeHandler}></input>
                        <button>Comment</button>
                    </form>
                    <p>Comments: </p>
                    {
                        onePost1.comments.map((oneComment, index)=>(
                            <div key={index}>
                                <p>{oneComment.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OnePost;