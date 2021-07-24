import React, { Component } from 'react'

export class Cats extends Component {
    render() {
        return (
            <>
                { this.props.showCatsComponent &&
                    this.props.cats.map((cat, idx) => {
                        return (
                            <div key={idx}>
                                ({cat.catname})
                                {cat.breed}
                                <button onClick={()=>this.props.deleteCatProps(idx)}>Delete</button>
                                <button onClick={()=>this.props.UpdateCatProps(idx)}>Update</button>

                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default Cats