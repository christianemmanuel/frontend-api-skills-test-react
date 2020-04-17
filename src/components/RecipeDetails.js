import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.uuid,
      recipe: {},
      image: [],
      ingredients: [],
      directions: [],
      url: 'http://localhost:3001',
      title: '',
      type: '',
      specials: {
        "title": this.title,
        "type": this.type,
      },
      uuid: '',
      amount: '',
      measurement: '',
      name: '',
      specialTitle: '',
      specialType: '',
      loading: true,
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/recipes/${this.state.id}`)
      .then(data => {

        this.setState({ 
          recipe: data.data,
          image: this.state.url+data.data.images.full,
          ingredients: data.data.ingredients,
          directions: data.data.directions,
          loading: false 
        })
        // console.log(this.state.directions);
        
      }).catch(err => { console.log('CONSOLE ERROR '+ err) })

      this.setState({
        isLoading: false
      })
    
  }

  render() {
    const recipe = this.state.recipe;
    const image = this.state.image;
    const ingredients = this.state.ingredients
    const directions = this.state.directions

    const { loading } = this.state;
    // const specials = this.state.specials
    return (
      <section>
        { loading ? <h3 className="text-center">Loading...</h3> :  

          <div className="container">
            {recipe && 
              <div className="recipes-section">
                <div className="banner">
                  <div className="banner-overlay">
                    <h2>{this.state.recipe.title}</h2>
                    <ul>
                      <li><strong>Description</strong>: {this.state.recipe.description}</li>
                      <li><strong>Savings</strong>: {this.state.recipe.servings}</li>
                      <li><strong>Prep Time</strong>: {this.state.recipe.prepTime}</li>
                      <li><strong>Cook Time</strong>: {this.state.recipe.cookTime}</li>
                      <br />
                      <Link to={`/edit-recipe/${this.state.recipe.uuid}`} className="btn btn-sm btn-primary">Edit Recipe</Link>
                    </ul>
                  </div>
                  <div className="banner-image-container">
                    <img src={image} alt={this.state.recipe.title} />
                  </div>
                </div>
              </div>
            }

            <div className="row">
              <div className="col">
                <div className="ingredients-container">
                  <h2>Ingredients</h2>
                  {ingredients && ingredients.map((ingredient, i) =>
                    <React.Fragment key={i}>
                      <div className="ingredient-detail">
                        <p><strong>Name</strong>: {ingredient.name}</p>
                        <p><strong>Amount</strong>: {ingredient.amount}</p>
                        <p><strong>Measurement</strong>: {ingredient.measurement}</p>
                        <hr />
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="directions-container">
                <h2>Directions</h2>
                  {directions && directions.map((direction, i) =>
                    <ul className="directions-detail" key={i}>
                      <li>{direction.instructions}</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
        
      </section> 
    )
  }
}

export default RecipeDetails
