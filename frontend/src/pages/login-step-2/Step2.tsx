import React, { useState } from "react";
import Button from "@mui/material/Button";
import { tss } from "tss-react/mui";

const useStyles = tss.withName("Step2").create({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
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
    textAlign: "center",
  },
});

function Step2() {
  const { classes } = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [arrayValue, setArrayValue] = useState([]);

  const [buttonsValues, setButtonsValues] = useState([{
    values: [1,2]
  },
  {
    values: [3,4]
  },
  {
    values: [5,6]
  },
  {
    values: [7,8]
  },
  {
    values: [9,0]
  }]);

  const handleButtonClick = (value: any) => {
    if (inputValue.length < 6) {
      setInputValue(inputValue + value);
      // setArrayValue([...arrayValue, value]);
    }
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
    <section className={classes.box}>
      <div  className={classes.passwordButtons}>
        {buttonsValues.map((buttonValue, index) => (
          <div key={index}>
            <Button className={classes.button} onClick={() => handleButtonClick(buttonValue.values)}>{buttonValue.values[0] + " ou " + buttonValue.values[1]}</Button>
          </div>
        ))}
      </div>
      <div>
        <div className={classes.displayField}>{inputValue}</div>
        <div className={classes.manageButtons}>
          <Button className={classes.button} onClick={handleClearButtonClick}>Clear</Button>
          <Button className={classes.button} onClick={handleLogin}>Login</Button>
        </div>
       
      </div>
      
      
    </section>
  );
}

export default Step2;
