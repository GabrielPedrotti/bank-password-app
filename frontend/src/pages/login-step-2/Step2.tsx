import React, { useState } from "react";
import { Typography, Button, Box, IconButton } from "@mui/material";
import { tss } from "tss-react/mui";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const useStyles = tss.withName("Step2").create({
  box: {
    display: "flex",
    backgroundColor: "#e7e7e7",
    borderRadius: "5px",
    height: "500px",
    width: "900px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  passwordButtons: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  button: {
    margin: "5px",
    width: "50px",
    height: "50px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    background: "white",
    color: "black",
  },
  manageButtons: {
    marginLeft: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  displayField: {
    marginLeft: "100px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    width: "150px",
    height: "50px",
    textAlign: "center",
    lineHeight: "35px",
    backgroundColor: "white",
    fontSize: "20px",
  },
  headers: {
    display: "flex",
    flexDirection: "column",
    top: "0",
    marginTop: "20px",
    marginLeft: "20px",
  },
  titles: {
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    color: "#6E6E6E",
    fontFamily: "Inter",
    fontSize: "14px",
    lineHeight: "20px",
    marginTop: "2px",
  },
  sections: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
    marginLeft: "40%",
    display: "flex",
  },
  infos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    color: "#6E6E6E",
    fontFamily: "Inter",
    fontSize: "14px",
    marginTop: "2px",
    marginLeft: "10px",
    "&:hover": {
      color: "#d32f2f",
      backgroundColor: "#e7e7e7",
    },
  },
});

function Step2() {
  const { classes } = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [arrayValue, setArrayValue] = useState<any>([]);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(
    "Senha Incorreta, digite novamente.",
  );

  const [buttonsValues, setButtonsValues] = useState({
    keyboardNumbers: [
      {
        values: [1, 2],
      },
      {
        values: [3, 4],
      },
      {
        values: [5, 6],
      },
      {
        values: [7, 8],
      },
      {
        values: [9, 0],
      },
    ],
  });

  const handleButtonClick = (value: any) => {
    if (arrayValue.length <= 6) {
      setArrayValue([...arrayValue, value]);
    }

    console.log("arrayValue", arrayValue);
  };

  const handleClearButtonClick = () => {
    setInputValue("");
    setArrayValue([]);
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log("Logging in with input:", inputValue);
  };

  return (
    <Box className={classes.box}>
      <div>
        <div style={{ display: "flex" }}>
          <IconButton
            className={classes.backButton}
            aria-label="retornar"
            onClick={() => window.history.back()}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <div className={classes.headers}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Coloque sua senha
            </Typography>
            <Typography className={classes.text}>
              Use o teclado virtual para garantiar sua segurança.
            </Typography>
          </div>
        </div>
        <section className={classes.sections}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={classes.passwordButtons}>
              {buttonsValues?.keyboardNumbers.map((buttonValue, index) => (
                <div key={index}>
                  <Button
                    className={classes.button}
                    disabled={arrayValue.length === 6}
                    onClick={() => handleButtonClick(buttonValue.values)}
                  >
                    {buttonValue.values[0] + " ou " + buttonValue.values[1]}
                  </Button>
                </div>
              ))}
            </div>
            {error && <Typography color="error">{helperText}</Typography>}
          </div>
          <div className={classes.infos}>
            <div className={classes.displayField}>
              {arrayValue.map((value: any, index: any) => (
                <span key={index}>*</span>
              ))}
            </div>
            <div className={classes.manageButtons}>
              <Button
                className={classes.button}
                onClick={handleClearButtonClick}
                disabled={arrayValue.length === 0}
              >
                Limpar
              </Button>
              <Button
                className={classes.button}
                onClick={handleLogin}
                disabled={arrayValue.length !== 6}
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Box>
  );
}

export default Step2;
