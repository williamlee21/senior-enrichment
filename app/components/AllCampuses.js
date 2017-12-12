import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
        <h3>LIST OF CAMPUSES</h3>
        <button>
          <Link to="/new-campus">Add Campus</Link>
        </button>
        {
          campuses.map(campus => {
            return (
              <div key={campus.id}>
                <Link to={`/campuses/${campus.id}`} >{campus.name} </Link>
                <img src={campus.img} />
                <span>{campus.description}</span>
                {
                  campus.students.map(student => {
                    <span>{student.firstName}</span>
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
