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
import Typography from '@mui/material/Typography';

export default function Home() {
    const handleSubmit = (event) => {
        console.log("handling submit");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let pass = data.get('pass');
        let address = data.get('address');
        let telephone = data.get('telephone');
        let secondEmail = data.get('secondEmail');
        let secondPass = data.get('secondPass');

        console.log("Sent email: " + email);
        console.log("Sent pass: " + pass);
        console.log("Sent address: " + address);
        console.log("Sent telephone: " + telephone);
        console.log("Sent second email: " + secondEmail);
        console.log("Sent second pass: " + secondPass);

        runDBCallAsync('http://localhost:3000/api/newregister?email=${email}&pass=${pass}');
    }; // end handle submit

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();
        if (data.data === "valid") {
            console.log("login is valid!")
        } else {
            console.log("not valid ")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#f0f4f8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        backgroundColor: '#fff',
                        padding: 4, 
                        borderRadius: 2, 
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Sign In
                    </Typography>
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
                        label="Password"
                        type="password"
                        id="pass"
                        autoComplete="current-password"
                    />
                    {/* Address Field */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        type="text"
                        id="address"
                        autoComplete="address"
                    />
                    {/* Telephone Number Field */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="telephone"
                        label="Telephone Number"
                        type="tel"
                        id="telephone"
                        autoComplete="tel"
                    />
                    {/* Second Email Field */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="secondEmail"
                        label="Second Email"
                        type="email"
                        id="secondEmail"
                        autoComplete="email"
                    />
                    {/* Confirm Password Field */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="secondPass"
                        label="Confirm Password"
                        type="password"
                        id="secondPass"
                        autoComplete="new-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, padding: 1.5 }}
                    >
                        Sign In
                    </Button>
                    <Box textAlign="center">
                        <Link href="#" variant="body2">
                        
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}