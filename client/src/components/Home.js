import React from 'react';
import {Link, navigate} from '@reach/router';
import './Home.css';
import LogIn from './LogIn';

const Home = (props)=>{
    return(
        <div className='homeContainer'>
            <h1 className='title'>Cap It</h1>
            <div className='whiteContainer'>
                <LogIn/>
                <p>Don't have an account yet? <Link to={"/users/register"} style={{color:"#0086e3"}}>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Home;