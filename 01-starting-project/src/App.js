import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthForm from './Components/Authentication/AuthForm';
import Welcome from './Components/Welcome/Welcome';
import EditorComponent from './Components/ComposeMail/ComposeMail';


import './App.css';
import { emailActions } from './store/email-slice';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const email = useSelector((state) => state.email.email)
 
  const dispatch = useDispatch();

  
  useEffect(() => {
    

    if (!email) return;

    fetch(
      `https://mail-box-7af32-default-rtdb.firebaseio.com/recieved/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data = await res.json();
        for (const key in data) {
          const item = data[key];
          item.id = key;
          dispatch(emailActions.recievedEmail(item));
          if(!item.read){
            dispatch(emailActions.increaseUnreadEmails());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, email]);


  useEffect(() => {
    

    if (!email) return;

    fetch(
      `https://mail-box-7af32-default-rtdb.firebaseio.com/sent/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data = await res.json();
        for (const key in data) {
          const item = data[key];
          item.id = key;
          dispatch(emailActions.sentBox(item));
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, email]);

  

  setInterval(() => {
    fetch(
      `https://mail-box-7af32-default-rtdb.firebaseio.com/recieved/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        dispatch(emailActions.resetRecievedEmails());
        const data = await res.json();
        for (const key in data) {
          const item = data[key];
          item.id = key;
          
          dispatch(emailActions.recievedEmail(item));
          if(!item.read){
            dispatch(emailActions.increaseUnreadEmails());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },5000);
  
  

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>

        <Route path='/welcome/:id'>
          <Welcome />
        </Route>
        <Route path='/welcome/inbox'>
          <Welcome />
        </Route>

       
        <Route path = '/composeMail'>
          <EditorComponent />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
