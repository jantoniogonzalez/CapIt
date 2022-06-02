import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import './Home.css';

const LogIn = (props) =>{
    const [user, setUser] = useState({
        email: "",
        password:""
    })
    const [errorMessage, setErrorMessage] = useState("")

    const onChangeHandler = (e) =>{
        const newStateObject = {...user};
        newStateObject[e.target.name] = (e.target.value);
        setUser(newStateObject);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/cap-it/users/login", {
            email: user.email,
            password: user.password
        }, 
        {withCredentials: true})
            .then((res)=>{
                console.log(res);
                navigate("/posts");
            })
            .catch((err)=>{
                console.log(err);
                setErrorMessage(err.response.data.message);
            })
    }

    return(
        <form onSubmit = { submitHandler } className='whiteContainer'>
            <span className='errorMessage'>{errorMessage? errorMessage: ""}</span>
                <input type ="text" name="email" onChange = {onChangeHandler} placeholder='Email'/>
                <input type ="password" name="password" onChange = {onChangeHandler} placeholder='Password'/>
            <button className='button-13'>Login</button>
        </form>
    )
}

export default LogIn;