import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export function Header() {
  const [accountNumber, setAccountNumber] = useState('');

  const handleLogin = () => {
    console.log('Logging in with account number:', accountNumber);
  };

  const handleAccountNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          label="Account Number"
          variant="outlined"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </header>
    </div>
  );
}
