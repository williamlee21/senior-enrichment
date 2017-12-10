import React, {Component} from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
// import store from '../store'
// import {thunk} from '../reducers'
import Header from './Header'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import AllStudent from './AllStudents'
import NewCampus from './NewCampus'
import NewStudent from './NewStudent'


export default class Main extends Component{
 
  render(){
    //console.log('campus ',  this.state.selectedCampus)
    return (
      <div>
        <h1>hello</h1>
        <Router>
          <div>
            <Header deselectCampus={this.deselectCampus}/>
            <div>
              <Route exact path='/' component={AllCampuses} />
              <Route exact path='/campuses' component={AllCampuses} />
              <Route path='/campuses/:campusId' component={SingleCampus} />
              <Route path='/students/' component={AllStudent} />
              <Route path='/new-campus' component={NewCampus} />
              <Route path='/new-student' component={NewStudent} />
            </div>
          </div>
        </Router>
        {/* <AllCampuses selectCampus={this.selectCampus} {...this.state} />        
        {this.state.selectedCampus.id && 
        <SingleCampus campus={this.state.selectedCampus} />} */}
      </div>
    )
  }
}
