'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
var validator = require("email-validator");
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
    const validateForm = (event) => {
        let errorMessage = '';
         const data = new FormData(event.currentTarget);
        // get the email
        let email = data.get('email')
        // pull in the validator
        var validator = require("email-validator");
        // run the validator
        let emailCheck = validator.validate(email);
        // print the status true or false
        console.log("email status" +emailCheck);
        // if it is false, add to the error message.
        if(emailCheck == false){
          errorMessage += 'Incorrect email';
        }
        return errorMessage;
      }
      const handleSubmit = (event) => {
        console.log("handling submit");
        event.preventDefault();
        // call out custom validator
        let errorMessage = validateForm(event);
        // save the mesage
        setErrorHolder(errorMessage)
        // if we have an error
        if(errorMessage.length > 0){
          setOpen(true); // open the dialog and show the user the error.
        } else {
          // if we do not get an error
            const data = new FormData(event.currentTarget);
            let email = data.get('email')
            let pass = data.get('pass')
            console.log("Sent email:" + email)
            console.log("Sent pass:" + pass)
            console.log("calling db");
            runDBCallAsync(`api/login?email=${email}&pass=${pass}`)
          }// error message if
    
const data = new FormData(event.currentTarget);
let email = data.get('email')
let pass = data.get('pass')
console.log("Sent email:" + email)
console.log("Sent pass:" + pass)
runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`)
}; // end handle submit
async function runDBCallAsync(url) {
const res = await fetch(url);
const data = await res.json();
if(data.data== "valid"){
console.log("login is valid!")
} else {
console.log("not valid ")
}
}

// first  
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

// second
const [errorHolder, setErrorHolder] = React.useState(false);

return (
<Container maxWidth="sm">
<Box sx={{ height: '100vh' }} >
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
<TextField
margin="normal"
required
fullWidth
id="email"
label="Email Address"
name="email"
autoComplete="email"
autoFocus
/>
<TextField
margin="normal"
required
fullWidth
name="pass"
label="Pass"
type="pass"
id="pass"
autoComplete="current-password"
/>
<FormControlLabel
control={<Checkbox value="remember" color="primary" />}
label="Remember me"
/>
<Button
type="submit"
fullWidth
variant="contained"
sx={{ mt: 3, mb: 2 }}
>
Sign In
</Button>
</Box>
</Box>

<React.Fragment>

<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Error"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
     {errorHolder}
    </DialogContentText>
  </DialogContent>
  <DialogActions>

    <Button onClick={handleClose} autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>
</React.Fragment>

</Container>
); // end return
}

