import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'

//students will have a null campusId
export default class SingleCampus extends Component{

  constructor(){
    super()
    this.state = {
      selectedCampus: {},
      redirectToPage: false
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    const campusId = this.props.match.params.campusId
    axios.get(`api/campuses/${campusId}`)
    .then(res => res.data)
    .then(campus => this.setState({ selectedCampus:campus}))
  }

  handleDelete(evt){
    evt.preventDefault ()
    console.log(this.state.selectedCampus)
    const campusId = this.state.selectedCampus.id
    console.log(campusId)
    axios.delete(`/api/campuses/${campusId}`)
    axios.delete(`/api/students/campus/${campusId}`)
      .then(data => res.status(204).send())
      .then(this.setState({ redirectToPage: true}))
    
  }
  render(){
    const campus = this.state.selectedCampus
    console.log('state', this.state)
    return (
      <div>
        <div>
        { 
          this.state.redirectToPage &&
          <Redirect to='/campuses' />
        }
        <h2>{campus.name}</h2>
        <img src={campus.img} />
        {
          campus.students && campus.students.map(student => {
            return (
              <div key={student.id}>
                <span>Name: </span>
                <Link to={`/students/${student.id}`}>{student.fullName}</Link>
                <h5>Email: {student.email}</h5>
                <h5>GPA: {student.gpa}</h5>
              </div>
            )
          })
        }
        </div>
        <button>
          <Link to={`/update-campuses/${campus.id}`}>EDIT</Link>
        </button>
        <button onClick={this.handleDelete} >DELETE</button>
        <button>
            <Link to='/new-student'>Add Student</Link>
        </button>
      </div>
    )
  }
}
