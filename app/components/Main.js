import React, {Component} from 'react'
import axios from 'axios'
import {HashRouter as Router, Route} from 'react-router-dom'
import store from '../store'
import {thunk} from '../reducers'
import Header from './Header'
import AllCampuses from './AllCampuses'
import SingleCampuses from './SingleCampus'
import SingleCampus from './SingleCampus'


export default class Main extends Component{

  constructor(){
    super()
    this.state = {
      selectedCampus: {}
    }
    // this.selectCampus = this.selectCampus.bind(this)
    // this.deselectCampus = this.deselectCampus.bind(this)
  }

  componentDidMount(){
    const campuses = thunk()
    store.dispatch(campuses)
  }

  // selectCampus(campusId){
  //   //console.log('i am here' , campusId)
  //   axios.get(`api/campuses/${campusId}`)
  //     .then(res => res.data)
  //     .then(campus => this.setState({selectedCampus: campus}))
  // }

  // deselectCampus(){
  //   this.setState({selectedCampus: {}})
  // }
  render(){
    console.log('campus ',  this.state)
    return (
      <div>
        <h1>hello</h1>
        <Header deselectCampus={this.deselectCampus}/>
        <Router>
          <div>
            <Route exact path='/' component={AllCampuses} />
            <Route exact path='/campuses' component={AllCampuses} />
            <Route path='/campuses/:campusId' component={SingleCampus}/>
          </div>
        </Router>
      </div>
    )
  }
}
