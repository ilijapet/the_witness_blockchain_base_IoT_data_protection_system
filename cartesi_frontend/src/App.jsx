import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import SignInSide from "./components/signInSide";
import SignUp from "./components/signUp";
import Logout from "./components/logout";
import UserProfile from "./components/userProfile";
import ForgetPassword from "./components/forgetPassword";
import ResetConfirmationMail from "./components/resetConfirmationMail";
import ResetConfirmation from "./components/resetConfirmation";
import ResetPassword from "./components/resetPassword";

function App() {
  return (
    <Router>
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={SignInSide} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route
            exact
            path="/resetconfirmationmail"
            component={ResetConfirmationMail}
          />
          <Route
            exact
            path="/resetpassword/:param1/:param2"
            component={ResetPassword}
          />
          <Route
            exact
            path="/resetconfirmation"
            component={ResetConfirmation}
          />
        </Switch>
      </React.StrictMode>
    </Router>
  );
}

export default App;
