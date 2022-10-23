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
    console.log("before fetch", email);

    fetch(
      `https://mail-box-7af32-default-rtdb.firebaseio.com/${email}.json`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        const data = await res.json();
        for (const key in data) {
          const item = data[key];
          item.id = key;
          dispatch(emailActions.sentEmail(item));
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, email]);

  

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
