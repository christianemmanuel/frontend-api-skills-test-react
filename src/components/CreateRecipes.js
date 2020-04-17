import React, { Component } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export class CreateRecipes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      images: {
        "full": "/img/italian_meatballs.jpg",
        "medium": "/img/italian_meatballs--m.jpg",
        "small": "/img/italian_meatballs--s.jpg"
      },
      servings: '',
      prepTime: '',
      cookTime: '',
      postDate: new Date(),
      editDate: new Date(),
      ingredients: [{
        "uuid": uuidv4(),
        "amount": '',
        "measurement": '',
        "name": ''
      }],
      directions: [{
        "instructions": '',
        "optional": false
      }],
      values: [],
      submitSuccess: false,
    }
  }

  processFormSubmission = (e) => {
    e.preventDefault();
    
    const formData = {
      title: this.state.title,
      description: this.state.description,
      images: this.state.images,
      servings: this.state.servings,
      prepTime: this.state.prepTime,
      cookTime: this.state.cookTime,
      postDate: this.state.postDate,
      editDate: this.state.editDate,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
    }

    this.setState({ 
      submitSuccess: true, 
      values: [...this.state.values, formData]
    });

    axios.post(`http://localhost:3001/recipes`, formData).then(data => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    ]);
  }

  handleInputChanges = (e) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  // Ingredients funtions
  handleIngredientsChanges = idx => evt => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, [evt.target.name]: evt.target.value };
    });
    this.setState({ ingredients: newIngredients });
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
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  // Directions funtions
  handleDirectionsChanges = idx => evt => {
    const newDirections = this.state.directions.map((direction, sidx) => {
      if (idx !== sidx) return direction;
      return { ...direction, [evt.target.name]: evt.target.value };
    });
    this.setState({ directions: newDirections });
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
    this.setState({
      directions: this.state.directions.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    const { submitSuccess } = this.state;
    return (

      <section>
        <div className={"col-md-12 form-wrapper"}>
                  
          <h2>Create Recipes</h2>
          <br/>

          {/* {!submitSuccess && ( <div className="alert alert-info" role="alert">Fill the form below to create a new recipes</div> )} */}

          { submitSuccess && ( <div className="alert alert-success alert-fix" role="alert">The recipe was successfully created!</div> )}
          
          <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
            <div className="form-group">
              <label htmlFor="title"> Title </label>
              <input type="text" id="title" onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Title" />
            </div>

            <div className="form-group">
              <label htmlFor="description"> Description </label>
              <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Description" />
            </div>

            <div className="form-group">
              <label htmlFor="servings"> Servings </label>
              <input type="number" id="servings" onChange={(e) => this.handleInputChanges(e)} name="servings" className="form-control" placeholder="Servings" />
            </div>

            <div className="form-group">
              <label htmlFor="prepTime"> Prepared Time </label>
              <input type="text" id="prepTime" onChange={(e) => this.handleInputChanges(e)} name="prepTime" className="form-control" placeholder="Prepared Time" />
            </div>

            <div className="form-group">
              <label htmlFor="cookTime"> Cook Time </label>
              <input type="text" id="cookTime" onChange={(e) => this.handleInputChanges(e)} name="cookTime" className="form-control" placeholder="Cook Time" />
            </div>
      
            <div className="ingredients-container">
              {this.state.ingredients.map((ingredient, idx) => (
                <div className="ingredients" key={idx}>
                  <div className="form-group">
                    <label htmlFor="name"> Ingredient</label>
                    <input type="text" onChange={this.handleIngredientsChanges(idx)} name="name" className="form-control" placeholder="Ingredient Name" />
                  </div>
                  <div className="form-inline">
                    <div className="form-group mb-2">
                      <input type="text" onChange={this.handleIngredientsChanges(idx)} name="amount" className="form-control" placeholder="Amount" />
                    </div>
                    <div className="form-group mx-sm-2 mb-2">
                      <input type="text" onChange={this.handleIngredientsChanges(idx)} name="measurement" className="form-control" placeholder="Measurement" />
                    </div>
                    <button type="button" onClick={this.handleRemoveIngredients(idx)} className="btn btn-primary mb-2">-</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={this.handleAddIngredients} className="btn btn-outline-secondary btn-sm btn-block">Add Ingredients</button>

              <hr />
            </div>
            
            <div className="directions-container">
              {this.state.directions.map((direction, idx) => (
                <div className="directions" key={idx}>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <textarea name="instructions" cols="30" rows="3" onChange={this.handleDirectionsChanges(idx)} className="form-control" placeholder="Instructions"></textarea>
                    </div>
                    <button type="button" onClick={this.handleRemoveDirections(idx)} className="btn btn-primary mb-2">-</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={this.handleDirections} className="btn btn-outline-secondary btn-sm btn-block">Add Instructions</button>
              
              <hr/>
            </div>
            
            <button className="btn btn-primary btn-block btn-lg" type="submit">Create Recipes</button>
            
          </form>
        </div>
      </section>
    )
  }

}

export default CreateRecipes