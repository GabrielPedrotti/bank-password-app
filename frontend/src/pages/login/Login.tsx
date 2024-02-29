import React from 'react';
import logo from '../../logo.svg';
import './Login.css';
import Button from '@mui/material/Button';
import { tss } from "tss-react/mui";
import { Header } from '../components/header';

const useStyles = tss.withName('Login').create({
  app: {
    textAlign: 'center',
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  appLogo: {
    height: '40vmin',
    pointerEvents: 'none',
  }
})

function Login() {
  const { classes } = useStyles()

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="logo" />
        <Button variant="contained" color="primary">
          Learn React
        </Button>
      </div>
    </div>
  );
}

export default Login;
