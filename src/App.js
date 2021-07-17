import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,  Switch, Route, Link  } from "react-router-dom";

import AddCountry from './components/AddCountry';
import Countries from './components/Countries';
import CountriesList from './components/CountriesList';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/countries" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/countries"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/countries"]} component={CountriesList} />
          <Route exact path="/add" component={AddCountry} />
          <Route path="/countries/:id" component={Countries} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;