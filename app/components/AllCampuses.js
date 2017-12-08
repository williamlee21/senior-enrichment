import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import SingleCampus from './SingleCampus';

export default class AllCampuses extends Component{

  constructor(){
    super()
    this.state = {
      campuses: []
    }
  }

  componentDidMount(){
    axios.get('api/campuses')
    .then(res => res.data)
    .then(campuses => this.setState({campuses}))
  }

  render(){
    const campuses = this.state.campuses
    return(
      <div>
        <h3>CAMPUSES</h3>
        <button>Add Campus</button>
        {
          campuses.map(campus => {
            return (
              <div key={campus.id}>
                <Link to = {`/campus/${campus.id}`}> {campus.name} </Link>
                <span>{campus.description}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}
