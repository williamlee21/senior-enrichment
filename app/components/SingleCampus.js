import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

//students will have a null campusId
export default class SingleCampus extends Component{

  constructor(){
    super()
    this.state = {
      selectedCampus: {}
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
    axios.delete(`/api/campuses/${campusId}`)
    //axios.delete(`/api/students/campus/${campusId}`)
    .then(this.setState({ selectedCampus:{} }))
    
  }
  render(){
    const campus = this.state.selectedCampus
    console.log('state', this.state)
    return (
      <div>
        <div>
        { 
          !this.state.selectedCampus.id &&
          <h1>CAMPUS NOT FOUND</h1>
        }
        <h2>{campus.name}</h2>
        {
          campus.students && campus.students.map(student => {
            return (
              <div key={student.id}>
                <h4>Name: {student.fullName}</h4>
                <h5>Email: {student.email}</h5>
                <h5>GPA: {student.gpa}</h5>
              </div>
            )
          })
        }
        </div>
        <button>EDIT</button>
        <button onClick={this.handleDelete} >DELETE</button>
      </div>
    )
  }
}
