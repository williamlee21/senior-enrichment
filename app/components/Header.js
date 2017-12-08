import React, {Component} from 'react'

export default class Header extends Component{

  render(){
    return (
      <div>
        <button onClick={() => {this.props.deselectCampus()}}>Campuses</button>
        <button>Students</button>
      </div>
    )
  }
}
