import React, { useState } from "react";
import { tss } from "tss-react/mui";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserAccount } from "../../service/userAccount";

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
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [accountNumber, setAccountNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const data = await getUserAccount(accountNumber);
      navigate(`/password/${data.bankId}?=${data.sessionId}`);

    } catch (error: any) {
      setAccountNumber("");
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
    
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
          inputProps={{ pattern: "[0-9]*", maxLength: 12 }}
          error={errorMessage !== "" && !accountNumber}
          helperText={!accountNumber ? errorMessage : null}
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
