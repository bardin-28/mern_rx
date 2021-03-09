import React from 'react';
import './styles/App.scss'
import { useRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

import { connect } from 'react-redux'


import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import {Loader} from "./components/Loader/Loader";

const mapStateToProps = state =>({
  isLoading: state.isLoading,
  isAuthenticated: state.isAuthenticated
})

const App = state => {
  const {token, login, logout, userId, ready, isAuthenticated} = useAuth()
  const routes = useRoutes(state.isAuthenticated)


  if(!ready){
    return <Loader />
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          token: token, login: login, logout: logout, userId: userId, isAuthenticated: isAuthenticated,
          ready: ready
        }}
      >
        {state.isAuthenticated && <Navbar />}
        {state.isAuthenticated &&  <Sidebar />}
        <main>

          { routes }
        </main>
      </AuthContext.Provider>
    </div>
  );
}

const ConnectApp = connect(mapStateToProps)(App)
export {ConnectApp as App};
