import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router'

export default class NewCampus extends Component{

    constructor(){
        super()
        this.state = {
            campusName: '',
            campusDescription: '',
            dirty: false,
            campusImage: '',
            redirectToPage: false
        }
        this.handleCampusName = this.handleCampusName.bind(this)
        this.handleCampusDescription = this.handleCampusDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCampuseImage = this.handleCampuseImage.bind(this)
    }

    handleCampuseImage (evt){
        this.setState({ campusImage: evt.target.value})
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
        console.log(this.state)
        const name = this.state.campusName
        const description = this.state.campusDescription
        const campusImage = this.state.campusImage
        axios.post('/api/campuses/add', { name, description , imageURL: campusImage})
            .then(res => res.data)
            .then(campus => console.log(campus))  
        this.setState({ redirectToPage:true })
    }
    
    render(){
        const nameLength = this.state.campusName.length
        const tooShortAndDirty = this.state.dirty && nameLength < 1
        const warning = 'Campus Name is required'

        return (
            <div>
                {
                    this.state.redirectToPage && <Redirect to={'/campuses'}/>
                }
                <form onSubmit={this.handleSubmit}>
                    {
                        tooShortAndDirty && 
                        <div className='alert'>{ warning }</div>
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
                    <input
                        value={this.state.campusImage}
                        placeholder='Image URL'
                        onChange={this.handleCampuseImage}
                    />
                    <button disabled={!this.state.campusName.length}>SUBMIT</button>
                </form>
            </div>
        )
    }
}