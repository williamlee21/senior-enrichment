import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router'

export default class EditCampus extends Component{

    constructor(){
        super()
        this.state = {
            campusName: '',
            campusDescription: '',
            dirty: false,
            redirectToPage: false
        }
        this.handleCampusName = this.handleCampusName.bind(this)
        this.handleCampusDescription = this.handleCampusDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    ComponentDidMount(){
        //console.log(this.props.match.params.campusId)
        const campusId = this.props.match.params.campusId
        axios.get(`/campuses/${campusId}`)
        .then(res => res.data)
        .then((campus) => {
            console.log(campus)
            this.setState({campusName: campus.name, 
                campusDescription: campus.description
            })
        })
    }

    handleCampusName (evt){
        this.setState({ campusName: evt.target.value })
        this.setState({ dirty: true})
    }

    handleCampusDescription (evt){
        this.setState({ campusDescription: evt.target.value })
    }

    handleSubmit (evt){
        evt.preventDefault()
        console.log(this.props)
        const name = this.state.campusName
        const description = this.state.campusDescription
        const campusId = this.props.match.params.campusId
        axios.put(`/api/campuses/${campusId}`, { name, description })
            .then(res => res.data)
            .then(campus => console.log(campus))  
        this.setState({redirectToPage:true})
    }
    render(){
        const nameLength = this.state.campusName.length 
        const tooShortAndDirty = this.state.dirty && nameLength < 1
        const warning = 'Campus Name is required'

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        tooShortAndDirty && 
                        <div className='alert'>{ warning }</div>
                    }
                    {
                        this.state.redirectToPage && <Redirect to="/campuses/" />
                    }
                    <span>Campus Name</span>
                    <input
                        value={this.state.campusName}
                        placeholder='Enter campus name' 
                        onChange={this.handleCampusName} 
                    />
                    <span>Description</span>
                    <input 
                        value={this.state.campusDescription} 
                        placeholder='Enter description'
                        onChange={this.handleCampusDescription} 
                    />
                    <button disabled={!this.state.campusName.length}>UPDATE</button>
                </form>
            </div>
        )
    }
}