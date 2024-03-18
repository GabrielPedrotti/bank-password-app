import React, { useState, useEffect } from "react";
import { Typography, Button, Box, IconButton, CircularProgress  } from "@mui/material";
import { tss } from "tss-react/mui";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getPasswordKeyboard, checkPassword, getUserAccount} from "../../service/userAccount";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
  const [helperText, setHelperText] = useState("");
  const [sessionId, setSessionId] = useState<any>("");
  const [accountNumber, setAccountNumber] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [buttonsValues, setButtonsValues] = useState<any>({});

  useEffect(() => {
    const url = window.location.href;
    const queryString = url.split("?=").pop();
    const accountNumber = url.split("/").pop()?.split("?=")[0];

    setSessionId(queryString);
    setAccountNumber(accountNumber);
  }, []);

  useEffect(() => {
    console.log('sessionId', sessionId)
    if(sessionId && accountNumber){
      getKeyboardValues();
    }
  }, [sessionId]);

  const getKeyboardValues = async () => {
    try {
      const data = await getPasswordKeyboard(accountNumber, sessionId);
      setButtonsValues(data);
    } catch (error: any) {
      console.log('error', error)
    }
  }

  const handleButtonClick = (value: any) => {
    if (arrayValue.length <= 5) {
      setArrayValue([...arrayValue, {values: value}]);
    }
  };

  const handleClearButtonClick = () => {
    setInputValue("");
    setArrayValue([]);
    setIsLoading(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setHelperText("");
    setError(false);
    try {
      await checkPassword(accountNumber, arrayValue, sessionId);
      swal.fire({
        title: "Sucesso!",
        text: "Você foi logado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
      }});
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setHelperText(errorMessage);
      setError(true);
      const data = await getUserAccount(accountNumber);
      navigate(`/password/${data.bankId}?=${data.sessionId}`);
      setSessionId(data.sessionId);
      handleClearButtonClick();
      setIsLoading(false)
    }
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
              {Object.keys(buttonsValues).length > 0 && buttonsValues?.keyboardNumbers.map((buttonValue: any, index: any) => (
                <div key={index}>
                  <Button
                    className={classes.button}
                    disabled={arrayValue.length === 5}
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
              {!isLoading ? (
                <Button
                  className={classes.button}
                  onClick={handleLogin}
                  disabled={arrayValue.length !== 5}
                >
                  Login
                </Button>
              ): (
                <IconButton
                  className={classes.button}
                  disabled={isLoading}
                  aria-label="loading"
                >
                  <CircularProgress size={20} />
                </IconButton>
              )}

            </div>
          </div>
        </section>
      </div>
    </Box>
  );
}

export default Step2;
