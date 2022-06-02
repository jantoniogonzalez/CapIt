import axios from 'axios';
import React from 'react';
import {navigate} from '@reach/router';
import './Home.css'

const Logout = (props)=>{

    const onClickHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/cap-it/users/logout", {}, {withCredentials: true})
            .then((res)=>{
                console.log(res);
                navigate("/");
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div>
            <button className='button-1' onClick={onClickHandler}>Log Out</button>
        </div>
    )
}

export default Logout;