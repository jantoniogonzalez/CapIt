import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import './Home.css';

const Register = (props) =>{
    const [user, setUser] = useState({
        username: "",
        email: "",
        password:"",
        confirmPassword:""
    })
    const [errors, setErrors] = useState([])

    const onChangeHandler = (e) =>{
        const newStateObject = {...user};
        newStateObject[e.target.name] = (e.target.value);
        setUser(newStateObject);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/cap-it/users/register", user, {withCredentials: true})
            .then((res)=>{
                console.log(res);
                setUser({
                username: "",
                email: "",
                password:"",
                confirmPassword:""
                });
                navigate("/");
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return(
        <div className='homeContainer'>
            <h1 className='title'>Cap It</h1>
            <form onSubmit = { submitHandler } className='whiteContainer'>
                <input type ="text" name="username" value={user.username} onChange = {onChangeHandler} placeholder='Username'/>
                <br/>
                    {
                        errors.username?
                        <span className='errorMessage'>{errors.username.message}</span>
                        : null
                    }
                <input type ="text" name="email" value={user.email} onChange = {onChangeHandler} placeholder='Email'/>
                <br/>
                    {
                        errors.email?
                        <span className='errorMessage'>{errors.email.message}</span>
                        : null
                    }
                <input type ="password" name="password" value={user.password} onChange = {onChangeHandler} placeholder='Password'/>
                <br/>
                    {
                        errors.password?
                        <span className='errorMessage'>{errors.password.message}</span>
                        : null
                    }
                <input type ="password" name="confirmPassword" value={user.confirmPassword} onChange = {onChangeHandler}placeholder='Confirm Password'/>
                <br/>
                    {
                        errors.confirmPassword?
                        <span className='errorMessage'>{errors.confirmPassword.message}</span>
                        : null
                    }
                    <button className='button-13'>Register</button>
            </form>
        </div>
    )
}

export default Register;