import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * Import APP Components
 */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Bucketlist from "./components/Bucketlist/Bucketlist";
// import SignIn from "../Components/SignIn/SignIn";
// import Caterer from "../Components/Caterer/Caterer";

/**
 * Route declaration
 */

const NotFoundPage = () => <div>Not found</div>;
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/signup" component={SignUp} />
      <Route path="/bucketlist" component={Bucketlist} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;
