import React, { Component } from 'react'

export class UpdateCats extends Component {
    render() {
        return (
            <>
                <form onSubmit={(e)=>this.props.UpdateData(e)} >
                    <fieldset>
                        <legend>Updat data</legend>
                    
                    <label>Update cat name</label>
                    <input onChange={(e)=>this.props.updateCatNameProps(e)} type='text'  value={this.props.catName}/>
                    <label>Update cat name</label>
                    <input onChange={(e)=>this.props.updateCatBreedProps(e)} type='text' value={this.props.catBreed}/>

                    <input type='submit' value='Update'/>
               </fieldset>
                </form>
            </>
        )
    }
}

export default UpdateCats
