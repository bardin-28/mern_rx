import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import {Login} from "../pages/Login/Login";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {Create} from "../pages/Create/Create";


const useRoutes = isAuth => {

  if(!isAuth){
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login"/>
      </Switch>
    )
  }

 return(
   <>
     <Switch>
       <Route path="/dashboard" >
         <Dashboard />
       </Route>
       <Route path="/create">
         <Create />
       </Route>
       <Redirect to="/create"/>
     </Switch>
   </>
 )
}

export { useRoutes }
