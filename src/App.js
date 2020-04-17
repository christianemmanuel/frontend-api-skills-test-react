import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import CreateRecipes from './components/CreateRecipes';
import EditRecipes from './components/EditRecipes';

class App extends React.Component {
 render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">myRecipes</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>Recipes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/create-recipes'}>Create New Recipe</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Recipes} />
          <Route path={'/recipe/:uuid'} exact component={RecipeDetails} />
          <Route path={'/create-recipes'} exact component={CreateRecipes} />
          <Route path={'/edit-recipe/:uuid'} exact component={EditRecipes} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withRouter(App);