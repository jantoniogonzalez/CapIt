import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import Logout from './Logout';
import './Home.css';

const NavBar = (props)=>{

    return(
        <div style={{backgroundColor:"#FFB20F", display:"flex", justifyContent:"space-between", alignItems:"center", paddingRight:"5%", paddingLeft:"5%", flexDirection:"row"}}>
            <Link to="/posts" className="title" style={{fontSize:"70px"}}>Cap It</Link>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", width:"40%", justifyContent:"space-evenly"}}>
                <Link to='/posts/new' className='button-1'>New Post</Link>
                <Logout/>
            </div>
        </div>
    )
}

export default NavBar;