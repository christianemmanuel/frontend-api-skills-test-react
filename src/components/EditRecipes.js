import React, { Component } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class EditRecipes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.match.params.uuid,
      customer: {},
      values: [],
      loading: false,
      submitSuccess: false,
      ingredients: [],
      directions: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/recipes/${this.state.uuid}`).then(data => {
      this.setState({ 
        customer: data.data,
        ingredients: data.data.ingredients,
        directions: data.data.directions
      });
    })
  }

  processFormSubmission = async (e) => {
    e.preventDefault();

    this.setState({ 
      loading: true 
    });

    axios.patch(`http://localhost:3001/recipes/${this.state.uuid}`, this.state.values, this.state.ingredients).then(data => {
      this.setState({ 
        submitSuccess: true, 
        loading: false,
      })
      setTimeout(() => {
        this.props.history.push(`/recipe/${this.state.uuid}`);
      }, 1500)
    })
  }

  setValues = (values) => {
    this.setState({ 
      values: { ...this.state.values, ...values },
      ingredients: this.state.ingredients, ...values,
      directions: this.state.directions, ...values
    });
  }

  handleInputChanges = (e) => {
    e.preventDefault();
    this.setValues({ 
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  // Ingredients funtions
  handleIngredientsChanges = idx => evt => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, [evt.target.name]: evt.target.value };
    });
    this.setValues({ 
      ingredients: newIngredients 
    });
  };

  handleAddIngredients = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ 
        uuid: uuidv4(),
        amount: '',
        measurement: '',
        name: ''
      }])
    });
  };

  handleRemoveIngredients = idx => () => {
    this.setValues({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  // Directions funtions
  handleDirectionsChanges = idx => evt => {
    const newDirections = this.state.directions.map((direction, sidx) => {
      if (idx !== sidx) return direction;
      return { ...direction, [evt.target.name]: evt.target.value };
    });
    this.setValues({ 
      directions: newDirections 
    });
  };

  handleDirections = () => {
    this.setState({
      directions: this.state.directions.concat([{ 
        instructions: '',
        optional: false,
      }])
    });
  };

  handleRemoveDirections = idx => () => {
    this.setValues({
      directions: this.state.directions.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    const { submitSuccess, loading } = this.state;

    return (
      <section>
        {this.state.customer &&
          <div className={"col-md-12 form-wrapper"}>
            <h2>Update: {this.state.customer.title}</h2>
            <br/>

            {submitSuccess && ( <div className="alert alert-success alert-fix" role="alert">The recipe was successfully updated!</div>)}
            
            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
              <div className="form-group">
                <label htmlFor="title"> Title </label>
                <input type="text" id="title" defaultValue={this.state.customer.title} onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Title" />
              </div>

              <div className="form-group">
                <label htmlFor="description"> Description </label>
                <input type="text" id="description" defaultValue={this.state.customer.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Description" />
              </div>

              <div className="form-group">
                <label htmlFor="servings"> Servings </label>
                <input type="text" id="servings" defaultValue={this.state.customer.servings} onChange={(e) => this.handleInputChanges(e)} name="servings" className="form-control" placeholder="Servings" />
              </div>

              <div className="form-group">
                <label htmlFor="prepTime"> Prepare Time </label>
                <input type="text" id="prepTime" defaultValue={this.state.customer.prepTime} onChange={(e) => this.handleInputChanges(e)} name="prepTime" className="form-control" placeholder="Prepare Time" />
              </div>

              <div className="form-group">
                <label htmlFor="cookTime"> Cook Time </label>
                <input type="text" id="cookTime" defaultValue={this.state.customer.cookTime} onChange={(e) => this.handleInputChanges(e)} name="cookTime" className="form-control" placeholder="Cook Time" />
              </div>

              <div className="ingredients-container">
                {this.state.ingredients && this.state.ingredients.map((ingredient, idx) =>
                  <div className="ingredients" key={idx}>
                    <div className="form-group">
                      <label htmlFor="name"> Ingredient</label>
                      <input type="text" defaultValue={ingredient.name} onChange={this.handleIngredientsChanges(idx)} name="name" className="form-control" placeholder="Ingredient Name" />
                    </div>
                    <div className="form-inline">
                      <div className="form-group mb-2">
                        <input type="text" defaultValue={ingredient.amount} onChange={this.handleIngredientsChanges(idx)} name="amount" className="form-control" placeholder="Amount" />
                      </div>
                      <div className="form-group mx-sm-2 mb-2">
                        <input type="text" defaultValue={ingredient.measurement} onChange={this.handleIngredientsChanges(idx)} name="measurement" className="form-control" placeholder="Measurement" />
                      </div>
                      <button type="button" onClick={this.handleRemoveIngredients(idx)} className="btn btn-primary mb-2">-</button>
                    </div>
                  </div>
                )}
                
                <button type="button" onClick={this.handleAddIngredients} className="btn btn-outline-secondary btn-sm btn-block">Add Ingredients</button>
                <hr />
              </div>

              <div className="directions-container">
                {this.state.directions && this.state.directions.map((direction, idx) => (
                  <div className="directions" key={idx}>
                    <div className="form-group row">
                      <div className="col-sm-10">
                        <textarea name="instructions" defaultValue={direction.instructions} cols="30" rows="3" onChange={this.handleDirectionsChanges(idx)} className="form-control" placeholder="Instructions"></textarea>
                      </div>
                      <button type="button" onClick={this.handleRemoveDirections(idx)} className="btn btn-primary mb-2">-</button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={this.handleDirections} className="btn btn-outline-secondary btn-sm btn-block">Add Instructions</button>
                
                <hr/>
              </div>
              
              <button className="btn btn-success btn-block btn-lg" type="submit">Update Changes</button>
              { loading && <p>Loading</p> }
            </form>
          </div>
        }
      </section>
    )
  }

}
export default EditRecipes