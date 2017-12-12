import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class SingleStudent extends Component{

  constructor(){
    super()
    this.state = {
      selectedStudent: {}
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    const studentId = this.props.match.params.studentId
    axios.get(`api/students/${studentId}`)
    .then(res => res.data)
    .then(selectedStudent => this.setState({ selectedStudent}))
  }

  handleDelete(evt){
    evt.preventDefault ()
    const studentId = this.state.selectedStudent.id
    axios.delete(`/api/students/${studentId}`)
    .then(this.setState({ selectedStudent:{} }))
  }
  render(){
    const student = this.state.selectedStudent
    return (
      <div>
        <div>
        { 
          !this.state.selectedStudent.id &&
          <h1>STUDENT NOT FOUND</h1>
        }
        {
          this.state.selectedStudent.id &&
          <div><h2>{student.name}</h2>
        
              <div key={student.id}>
                <h4>Name: {student.fullName}</h4>
                <h5>Email: {student.email}</h5>
                <h5>GPA: {student.gpa}</h5>
                <h5>Campus: {student.campus.name}</h5>
              </div>
              </div>
          }
          </div>
        <button>
          <Link to={`/update-students/${student.id}`}>EDIT</Link>
        </button>
        <button onClick={this.handleDelete} >DELETE</button>
      </div>
    )
  }
}
