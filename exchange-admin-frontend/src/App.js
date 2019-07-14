import React from 'react';
import './App.css';
import { Redirect, Switch, Route } from 'react-router-dom'
import { CORE } from "./constants/routes";
import Login from './pages/login/login'
import Console from './pages/console/console'
import {isLoggedIn} from "./api/services/auth";


//TODO rewrite this shit
const withRedirect = (Component) => (props) => {
	if (!isLoggedIn()) {
		return <Redirect to={CORE.LOGIN} />
	}

	return <Component {...props}/>
};
console.log('www', isLoggedIn());

function App() {
  return (
    <div className="App">
      <Switch>
		  <Route exact path={CORE.BASE} render={() => <Redirect to={CORE.CONSOLE}/>}/>
		  <Route path={CORE.CONSOLE} component={withRedirect(Console)}/>
		  <Route path={CORE.LOGIN} component={Login}/>
	  </Switch>
    </div>
  );
}

export default App;
