import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import './Home.css';
import NavBar from './NavBar';
import Comments from './Comments';
import backg from './black-background.png';

const AllPosts = (props)=>{

    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/cap-it/posts")
            .then((res)=>{
                console.log(res.data);
                setPostList(res.data);
            })
            .catch((err)=>console.log(err))
    }, [])

    const showPostComments = (e)=>{
        axios.put("http://localhost:8000/api/cap-it/show-comments/"+e.target.value)
            .then((res)=>{
                console.log(res.data);
                axios.get("http://localhost:8000/api/cap-it/posts")
                    .then((response)=>{
                        console.log(response.data);
                        setPostList(response.data);
                    })
                    .catch((err)=>console.log(err))
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div>
                <NavBar/>
                <div className='mainBody'>
                    <div className='middle'>
                        {postList.map((onePost, index)=>(
                            <div key={index} className='post'>
                                <p>{onePost.postedBy.username} uploaded "{onePost.caption}"</p>
                                <Link to={`/post/${onePost._id}`}>
                                    <img src={require(`../imagesPosts/${onePost.postImage}`).default} alt={onePost.postImage} className='postImages'></img>
                                </Link>
                                <button onClick={showPostComments} className='button-11' value={onePost._id}>Show Comments</button>
                                <div className='commentSection'>
                                    {
                                        onePost.showComments && onePost.comments.map((oneComment1, subIndex)=>
                                            <p key={subIndex}>{oneComment1.text}</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}

export default AllPosts;