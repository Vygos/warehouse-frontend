import React from "react";
import { connect } from "react-redux";
import { load } from "../actions/data";
import history from "../history";
import { Router, Route, Switch } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import Login from "../pages/Login";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";

const App = props => {
  window.setTimeout(() => {
    props.load(false);
  }, 4000);

  const q = () => {
    if (props.loaded) {
      return (
        <React.Fragment>
          <NavBar />
          <div style={{ marginTop: "15%", marginLeft: "48%" }}>
            <CircularProgress size={30} />
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <NavBar>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </NavBar>
      </div>
    );
  };

  return <div>{q()}</div>;
};

const myStateToProps = state => {
  return state;
};
export default connect(
  myStateToProps,
  { load }
)(App);
