import React, {Component} from 'react'

export default class NewStudent extends Component{

    render(){
        return (
            <div>
                <span>First Name</span>
                <input />
                <span>Last Name</span>
                <input />
                <span>Email</span>
                <input />
                <span>GPA</span>
                <input />
                <button>SUBMIT</button>
            </div>
        )
    }
}