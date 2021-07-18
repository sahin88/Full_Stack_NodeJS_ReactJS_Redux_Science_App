import React,{useEffect, useState } from 'react';
import './App.css';

import Layout from './hocs/Layout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Form from './containers/Form';
import {useSelector} from 'react-redux';
import {useDispatch } from 'react-redux';
import {getPost, getPaginatedPost} from './actions/actions'
import Homerus from './containers/Homerus';
import Login from './containers/Login';
import Register from './containers/Register';
import PostDetail from './containers/PostDetail';




function App() {

  const state = useSelector(state => state.posts);
  const dispatch = useDispatch()
 


  useEffect(() => {
    dispatch(getPaginatedPost(1, 3))
    return () => {
    }
  },[])


  return (
       <Router>
         <Layout>
         <Switch>
             <Route exact path="/"  component={Homerus} posts={state} />
             <Route exact  path="/search" exact component={Homerus} posts={state} />
             <Route exact   path="/post/:id" component={PostDetail} />
             <Route  exact path="/form" component={Form} />
             <Route  exact exact path="/login" component={Login}/>
             <Route  exact path="/register" component={Register}/>
           </Switch>
         </Layout>
       </Router>   
  );
}



export default App;
