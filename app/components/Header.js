import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component{

  render(){
    return (
      <div>
        {/* <button onClick={() => {this.props.deselectCampus()}}>Campuses</button> */}
        <Link to="/campuses"> CAMPUSES </Link>
        <Link to="/students">STUDENTS</Link>
      </div>
    )
  }
}
