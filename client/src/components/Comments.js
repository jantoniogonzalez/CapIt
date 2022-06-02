import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import './Home.css';


const Comments = (props) =>{
    const {id} = props.id;
    const {allComments} = props.allComments;
    const [seeMore, setSeeMore] = useState(false);
    const [newComment, setNewComment] = useState({
        text: ""
    });
    const [errors, setErrors] = useState([])

    const onChangeHandler = (e) =>{
        setNewComment({text: e.target.value});
    }
    const submitComment = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/cap-it/posts/${id}`,
        newComment,
        {withCredentials: true}
        )
            .then((res)=>{
                console.log(res.data);
                setNewComment({text: ''})
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }
    return(
        <div>
            <form onSubmit={submitComment}>
                <input type="text" name="text" value={newComment.text} onChange={onChangeHandler}></input>
                <button>Comment</button>
            </form>
            <button onClick={setSeeMore(true)}>Show Comments</button>
        </div>
    )
}

export default Comments