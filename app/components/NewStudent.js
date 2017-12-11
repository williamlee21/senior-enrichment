import React, {Component} from 'react'
import axios from 'axios'
//having trouble setting campusId. evt is null on handleCampusId
export default class NewStudent extends Component{

    constructor() {
        super()
        this.state = {
            campuses: [],
            firstName: '',
            lastName: '',
            email: '',
            gpa: 0.0,
            campusId: 0
        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleGPA = this.handleGPA.bind(this)
        this.handleCampusId = this.handleCampusId.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
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
    handleCampusId (evt){
        console.log('evt ', evt.target)
        this.setState({ campusId: evt})
        console.log('state ', this.state.campusId)
    }

    handleSubmit (evt){
        evt.preventDefault()
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const gpa = this.state.gpa
        const campusId = this.state.campusId
        //need to fix handlesubmit 
        axios.post('/api/students/add', { firstName, lastName, email, gpa, campusId })
            .then(res => res.data)
            .then(student => console.log(student))  
        this.setState({ firstName:'', lastName:'', email:'', gpa:0.0, campusId:0 })
    }

    render(){
        // console.log(this.state)
        return (
            <div>
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
                        <select >
                        {
                            this.state.campuses.map(campus => {
                                return (
                                    <option onChange={this.handleCampusId} key={campus.id} value={campus}>
                                        {campus.name}
                                    </option>
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