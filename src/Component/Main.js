import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import PatternDetail from './PatternDetail'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  
  render() {  return(
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/Dashboard' component={Dashboard}/>
      <Route exact path='/PatternDetail' component={PatternDetail}/>
    </Switch>
  </main>
)
} }
export default Main
