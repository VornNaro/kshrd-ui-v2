import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminLayout from "./layouts/Admin";
import ClientLayout from "./layouts/Client";

function App() {
  console.log("----->", process.env.REACT_APP_API_URL)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/" render={props => <ClientLayout {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
