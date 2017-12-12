import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router'

export default class NewStudent extends Component{

    constructor() {
        super()
        this.state = {
            campuses: [],
            firstName: '',
            lastName: '',
            email: '',
            gpa: 0,
            campusId: 0,
            redirectToPage: false
        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleGPA = this.handleGPA.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        //console.log(this.props.match.params)
        axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => this.setState({ campuses }))
    }

    handleFirstName(evt){
        this.setState({ firstName: evt.target.value })
    }
    handleLastName(evt){
        this.setState({ lastName: evt.target.value })
    }
    handleEmail(evt){
        this.setState({ email: evt.target.value })
    }
    handleGPA(evt){
        this.setState({ gpa: evt.target.value })
    }

    handleSubmit (evt){
        evt.preventDefault()
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const gpa = this.state.gpa
        const campusId = evt.target.something.value
        const studentId = this.props.match.params.studentId
        axios.put(`/api/students/${studentId}`, { firstName, lastName, email, gpa, campusId })
            .then(res => res.data)
            .then(student => console.log(student)) 
            .then(this.setState({ redirectToPage:true }))
    }

    render(){
        const studentId = this.props.match.params.studentId
        return (
            <div>
                {
                    this.state.redirectToPage && <Redirect to={`/students/${studentId}`} />
                }
                <form onSubmit={this.handleSubmit}>
                    <span>First Name</span>
                        <input 
                            value={this.state.firstName}
                            placeholder='Enter first name'
                            onChange={this.handleFirstName}
                        />
                    <span>Last Name</span>
                        <input 
                            value={this.state.lastName}
                            placeholder='Enter last name'
                            onChange={this.handleLastName}
                        />
                    <span>Email</span>
                        <input 
                            value={this.state.email}
                            placeholder='Enter email'
                            onChange={this.handleEmail}
                        />
                    <span>GPA</span>
                        <input 
                            value={this.state.gpa}
                            placeholder='Enter gpa'
                            onChange={this.handleGPA}
                        />
                    <span>CAMPUS</span>
                        
                        <select name='something'>
                        {
                            this.state.campuses.map(campus => {
                                 return (
                                    <option  key={campus.id} value={campus.id}>{campus.name}</option>
                                )
                            })
                        }
                        </select>
                    <button>SUBMIT</button>
                </form>
            </div>
        )
    }
}