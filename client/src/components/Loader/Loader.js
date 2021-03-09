import React from "react";
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import orange from '@material-ui/core/colors/orange';


const mapStateToProps = state =>({
  isLoading: state.isLoading,
  isAuthenticated: state.isAuthenticated
})

const Loader = props => {
  const orangeM = orange[600];

  return(
    <div>
         <CircularProgress style={{color: orangeM}} />
    </div>
  )
};


const ConnectLoader = connect(mapStateToProps)(Loader)

export { ConnectLoader as Loader }

