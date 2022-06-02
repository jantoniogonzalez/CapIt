import React, {useEffect} from 'react';
import {Router} from '@reach/router';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Register from './components/Register';
import AllPosts from './components/AllPosts';
import OnePost from './components/OnePost';
import OneUser from './components/OneUser';
import AddPost from './components/AddPost';

function App() {

  return (
    <div className="App">
      <Router>
          <Home path="/"/>
          <LogIn path="/users/login"/>
          <Register path="/users/register"/>
          <AllPosts path="/posts"/>
          <OnePost path="/post/:id"/>
          <OneUser path="/oneUser/:userId"/>
          <AddPost path="/posts/new"/>
        </Router>
    </div>
  );
}

export default App;
