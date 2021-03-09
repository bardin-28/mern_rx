import React, { useState, useContext } from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

import { connect } from 'react-redux';
import { setAuthSuccess } from "../../redux/actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

// Redux
const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = dispatch =>({
  onSuccess: () => dispatch(setAuthSuccess())
})


// Styles
const useStyles = makeStyles((theme) => ({
  error: {
    color: 'red'
  },
  container: {
    background: '#B5B5B5',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    padding: 30,
    maxWidth: 350,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialForm = {
  login: '',
  password: '',
}

const Login = state => {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const {loading, error, request} = useHttp()
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState(false)


  const loginHandler = async () => {
    setFormError(true)
    try{
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    }catch (e){
      console.error(e)
    }
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          My Store
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={ formError }
            onChange={(e) => {
             setForm({
               ...form, login: e.target.value
             })
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={ formError }
            onChange={(e) => {
              setForm({
                ...form, password: e.target.value
              })
            }}

          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault()
              loginHandler()
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}


const ConnectLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export { ConnectLogin as Login }
