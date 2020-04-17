import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/recipes')
      .then(data => {
        this.setState({ 
          recipes: data.data,
        })
        console.log(data.data)
      }).catch(err => { console.log('CONSOLE ERROR '+ err) })

      this.setState({ 
        isLoading: false
      })
  }

  deleteRecipes(uuid) {
    axios.delete(`http://localhost:3001/recipes/${uuid}`)
      .then(data => {
        const index = this.state.recipes.findIndex(recipe => recipe.uuid === uuid);
        this.state.recipes.splice(index, 1);
        this.props.history.push('/');
      })
  }
  
  render() {
    const recipes = this.state.recipes;
    const { isLoading } = this.state
    
    return (
      <section>
        <div className="container">
          <h1>All Recipes</h1>
          {isLoading ? <p>Loading Data</p> : 
          
          <React.Fragment>
            {recipes.length === 0 && (
              <div className="text-center">
                <h2>No recipes found at the moment</h2>
              </div>
            )}

            <div className="recipes-container">
              {recipes && recipes.map(recipe =>
                <div className="recipes-list" key={recipe.uuid}>
                  <div className="recipes-list-detail">
                    <p>{recipe.title}</p>
                    <span>{recipe.description}</span>
                    <div className="img-container">
                      <img src={'http://localhost:3001/'+recipe.images.medium} alt={recipe.images.medium}/>
                    </div>
                    <Link to={`recipe/${recipe.uuid}`} className="btn btn-sm btn-outline-primary">View Recipes</Link>
                    
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteRecipes(recipe.uuid)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
          
          }
        </div>
      </section>
    )
  }

}

export default Recipes
