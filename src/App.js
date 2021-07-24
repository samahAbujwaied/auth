import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import AddCatForm from './AddCatForm'
import UpdateCats from './UpdateCats'
import axios from 'axios';

class App extends Component {
  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      catName:'',
      catBreed:'',
      showCatsComponent: false,
      server: "http://localhost:4506",
      show:false,
      filterArr:[],
      index:'',
    }
  }

  updateName = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  updateCatName = (event) => {
    this.setState({
      catName: event.target.value
    })
  }
  updateCatBreed = (event) => {
    this.setState({
      catBreed: event.target.value
    })
  }
// To get data from backend 
  getCats = async (event) => {
    event.preventDefault();
    try {
      const paramsObj = {
        name: this.state.name
      }
      // const cats = await axios.get(`${this.state.server}/cat`,{params: paramsObj});
      const cats = await axios.get(`${this.state.server}/cat?name=${this.state.name}`);   
      this.setState({
        cats: cats.data.cats,
        showCatsComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }
// seed data on backend
  addCat = async(event) =>{
    event.preventDefault();
    // const newCat = await axios.get(`${this.state.server}/addCat?catName=${this.state.catName}&catBreed=${this.state.catBreed}&ownerName=${this.state.name}`)
    const catFormData = {
      catName: this.state.catName,
      catBreed:this.state.catBreed,
      ownerName:this.state.name
    }
    const newCats = await axios.post(`${this.state.server}/addCat`,catFormData)
    // const newCat = await axios.get(`${this.state.server}/addCat`,{params:catFormData})
    this.setState({
      cats:newCats.data
    })

  }
// delete data from backend
  deleteCat = async(index) =>{
    const ownerName = {
      name:this.state.name
    }
    let newCats = await axios.delete(`${this.state.server}/deleteCat/${index}`,{params:ownerName})

    this.setState({
      cats:newCats.data
    })

  }
  UpdateFormCat = (idx)=>{
    const choosCat = this.state.cats.filter((val,index)=>{
      return idx===index
    })
    console.log(choosCat );
    this.setState({
      show:true,
      index:idx,
      catName:choosCat[0].catname,
      catBreed:choosCat[0].breed,
    })
  }
// update data on backend
  UpdateData= async(e)=>{
    e.preventDefault();
    const catData={
      catName:this.state.catName,
      catBreed:this.state.catBreed,
      ownerName:this.state.name,
      index:this.state.index
    }
    
    const updateee= await axios.put(`${this.state.server}/updateCat/${this.state.index}`,catData);
    this.setState({
      cats:updateee.data
    })
   
  }
  render() {
    
    return (
      <>
        <div>
         
          <Form
            updateName={this.updateName}
            getCats={this.getCats}
          />
           <Cats
            cats={this.state.cats}
            showCatsComponent={this.state.showCatsComponent}
            deleteCatProps={this.deleteCat}
            UpdateCatProps={this.UpdateFormCat}
          />
          <AddCatForm 
          updateCatNameProps = {this.updateCatName}
          updateCatBreedProps = {this.updateCatBreed}
          addCatProps = {this.addCat}/>
        </div>
        {this.state.show && 
        <UpdateCats 
        catName={this.state.catName}
        catBreed={this.state.catBreed}
        UpdateData={this.UpdateData}
        updateCatNameProps = {this.updateCatName}
          updateCatBreedProps = {this.updateCatBreed}
        />}
      </>
      
    )
    
  }
}

export default App;