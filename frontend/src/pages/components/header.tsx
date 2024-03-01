import React, { useState } from "react";
import { tss } from "tss-react/mui";
import { TextField, Button } from "@mui/material";

const useStyles = tss.withName("Header").create({
  app: {
    textAlign: "center",
  },
  appHeader: {
    backgroundColor: "white",
    //minHeight: "100vh",
    display: "flex",
    //flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
    color: "cyan",
    //border: "1px solid red",
  },
  appLogo: {
    height: "40vmin",
    pointerEvents: "none",
    border: "1px solid green",
  },
  appButton: {
    marginLeft: "5px",
    marginTop: "7px",
  },
  appTextField: {
    //border: "1px solid red",
    width: "80%",
    marginLeft: "5px",
  },
});

export function Header() {
  const { classes } = useStyles();
  const [accountNumber, setAccountNumber] = useState("");

  const handleLogin = () => {
    console.log("Logging in with account number:", accountNumber);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccountNumber(event.target.value);
  };

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <TextField
          className={classes.appTextField}
          label="Account Number"
          variant="outlined"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          fullWidth
          margin="normal"
          size="small"
        />
        <Button
          className={classes.appButton}
          //sx={{ backgroundColor: "white" }}
          variant="contained"
          color="secondary"
          size="medium"
          onClick={handleLogin}
        >
          Login
        </Button>
      </header>
    </div>
  );
}
