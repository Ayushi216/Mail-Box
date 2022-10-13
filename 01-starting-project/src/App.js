import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthForm from './Components/Authentication/AuthForm';
import Welcome from './Components/Welcome/Welcome';


import './App.css';


function App() {
  

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        <Route path='/welcome'>
          <Welcome />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
