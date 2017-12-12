import React, {Component} from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
// import store from '../store'
// import {thunk} from '../reducers'
import Header from './Header'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import AllStudents from './AllStudents'
import NewCampus from './NewCampus'
import NewStudent from './NewStudent'
import SingleStudent from './SingleStudent'
import EditCampus from './EditCampus';
import EditStudent from './EditStudent'

export default class Main extends Component{
 
  render(){
    return (
      <div>
        <h1>FULLSTACK</h1>
        <Router>
          <div>
            <Header deselectCampus={this.deselectCampus}/>
            <div>
              <Route exact path='/' component={AllCampuses} />
              <Route exact path='/campuses' component={AllCampuses} />
              <Route path='/campuses/:campusId' component={SingleCampus} />
              <Route exact path='/students/' component={AllStudents} />
              <Route path='/students/:studentId' component={SingleStudent} />
              <Route path='/new-campus' component={NewCampus} />
              <Route path='/new-student' component={NewStudent} />
              <Route path='/update-campuses/:campusId' component={EditCampus} />
              <Route path='/update-students/:studentId' component={EditStudent} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}
