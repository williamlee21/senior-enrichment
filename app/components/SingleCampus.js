import React, {Component} from 'react'
import axios from 'axios'

export default class SingleCampus extends Component{

  
  componentDidMount(){
    axios.get('/campuses/:id')
    .then(res => res.data)
    .then()
  }

  render(){
    console.log(this.props.state)
    return (
      <div>
        <h3>Single Campus</h3>
        <h4>{this.props.campus.name}</h4>
        <h5>{this.props.campus.students}</h5>
      </div>
    )
  }
}