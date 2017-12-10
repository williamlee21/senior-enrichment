import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SingleCampus from './SingleCampus';


export default class AllCampuses extends Component{

  constructor(){
    super()
    this.state = {
      students: []
    }
  }

  componentDidMount(){
    axios.get('api/students')
    .then(res => res.data)
    .then(students => this.setState({students}))
  }

  render(){
    const students = this.state.students
    
    return(
      <div>
        <h3>STUDENTS</h3>
        <button>
            <Link to='/new-student'>Add Student</Link>
        </button>
        {
          students.map(student => {
            return (
              <div key={student.id}>
                <span>{student.fullName} </span>
                <span>{student.email}</span>
                <span>{student.gpa}</span>
                <span>{student.campusId}</span>
                <button>Delete Student Info </button>
              </div>
            )
          })
        }
      </div>
    )
  }
}