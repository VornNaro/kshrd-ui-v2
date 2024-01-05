import React from "react";

import Navbar from '../components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Dashboard from '../components/dashboard/Dashboard';
import Users from '../components/users/Users';
import Partner from '../components/partner/Partner';
import PartnerType from '../components/partnerType/PartnerType';
import Alumni from '../components/alumni/Alumni';
import Menu from '../components/menu/Menu';
import CourseTrainingType from '../components/courseTrainingType/CourseTrainingType';
import CourseTraining from '../components/CourseTraining/CourseTraining';
import Generation from '../components/generation/Generation';
import CareerPath from '../components/careerPath/CareerPath';
import Announcement from '../components/announcement/Announcement';
import EventCategory from '../components/eventCategory/EventCategory';
import LoginScreen from '../components/login/LoginScreen';
import PrivateRoute from '../components/login/PrivateRoute';
import NoPage from '../components/login/NoPage';
import EventDynamicForm from '../components/event/EventDynamicForm';
import PageNotFound from "../components/client/pageNotFound/PageNotFound";


function Admin() {
  return (
    <div className="App admin-style">
      <Router>
        <Switch>
          <Route exact path="/admin/(login)" component={LoginContainer} />
          <PrivateRoute component={DefaultContainer} />
        </Switch>
      </Router>
    </div>
  );
}
const LoginContainer = () => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/admin/login" />} />
    <Route path="/admin/login" component={LoginScreen} />
  </div>
)

const DefaultContainer = () => (
  <div>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path="/admin" exact component={Dashboard} />
        <Route path="/admin/dashboard" exact component={Dashboard} />
        <Route path="/admin/users" exact component={Users} />
        <Route path="/admin/partner" exact component={Partner} />
        <Route path="/admin/partner-type" exact component={PartnerType} />
        <Route path="/admin/alumni" exact component={Alumni} />
        <Route path="/admin/menu" exact component={Menu} />
        <Route path="/admin/course-training-types" exact component={CourseTrainingType} />
        <Route path="/admin/course-training" exact component={CourseTraining} />
        <Route path="/admin/generation" exact component={Generation} />
        <Route path="/admin/career-path" exact component={CareerPath} />
        <Route path="/admin/announcement" exact component={Announcement} />
        <Route path="/admin/event-category" exact component={EventCategory} />
        <Route path="/admin/event" exact component={EventDynamicForm} />
        <Route path='/admin/*' exact={true} component={PageNotFound} />
      </Switch>

    </Router>
  </div>
);

export default Admin;
