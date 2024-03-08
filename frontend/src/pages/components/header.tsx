import React, { useState } from "react";
import { tss } from "tss-react/mui";
import { TextField, Button } from "@mui/material";

const useStyles = tss.withName("Header").create({
  app: {
    textAlign: "center",
  },
  appHeader: {
    backgroundColor: "#222",
    display: "flex",
    alignItems: "center",
    color: "cyan",
  },
  appButton: {
    marginLeft: "5px",
    marginRight: "20px",
    backgroundColor: "white",
    color: "black",
    '&:hover': {
      backgroundColor: "lightgrey",
    },
    '&:disabled': {
      color: "grey",
      backgroundColor: "lightgrey",
    },
  },
  appTextField: {
    width: "30%",
    marginRight: "5px",
    marginLeft: "20px",
    marginBottom: "8px",
    backgroundColor: "white",
    borderRadius: "5px",

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
    // Only allow numbers
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setAccountNumber(event.target.value);
    }
  };

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <TextField
          className={classes.appTextField}
          label="Número da Conta"
          variant="filled"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          margin="dense"
          color="success"
          size="small"
          inputProps={{ pattern: "[0-9]*" }}
        />
        <Button
          className={classes.appButton}
          variant="contained"
          size="medium"
          disabled={!accountNumber}
          onClick={handleLogin}
        >
          Login
        </Button>
      </header>
    </div>
  );
}
