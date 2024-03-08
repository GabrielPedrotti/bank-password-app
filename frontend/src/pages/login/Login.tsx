import React from "react";
import logo from "../../logo.svg";
import Button from "@mui/material/Button";
import { tss } from "tss-react/mui";
import { Header } from "../components/header";

const useStyles = tss.withName("Login").create({
  app: {},
  appHeader: {
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "100",
  },
  appLogo: {
    height: "40vmin",
    pointerEvents: "none",
  },
  appBody: {
    border: "1px solid cyan",
    position: "relative",
  },
});

function Login() {
  const { classes } = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <Header />
      </header>
      <body className={classes.appBody}>
        <p>
          fsdafasdfasdfasdfdsfasdfsaaaaaaaaaaaaaaaaaadfsdafsdafsadfasdfasdfsdaf
        </p>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
        <Button>
          <img src={logo} className={classes.appLogo} alt="logo" />
        </Button>
      </body>
    </div>
  );
}

export default Login;
