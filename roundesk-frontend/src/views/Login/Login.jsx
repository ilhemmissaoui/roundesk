import React, { Fragment, useState } from 'react';
import { Container, Grid, Button, Box, TextField, Typography, Checkbox } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3003/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        const responseData = await response.json();
        if (response.status === 401) {
          setError(responseData.message);
        } else {
          console.error('Login failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = () => {
    navigate('/registration');
  };

  return (
    <Fragment>
      <Box sx={{ background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%" }}>
        <Container alignItems="center" >
          <Grid container sx={{ height: "100vh", alignItems: "center", justifyContent: "center", }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{ background: "white", boxShadow: 3, borderRadius: 3, p: 3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Login
              </Typography>
              <Box>
                <TextField name="email" label="Email" variant="outlined" fullWidth onChange={handleInputChange} />
              </Box>
              <Box my={3} ><TextField name="password" label="Password" variant="outlined" fullWidth type="password" onChange={handleInputChange} />
              </Box>
              {error && <Typography color="error">{error}</Typography>}

              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px' }}>
                <Button fullWidth sx={{ color: "white", }} onClick={handleLogin}>Login</Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}>
                <Box display="flex">
                  <Checkbox defaultChecked />
                  <p>Remember me</p>
                </Box>
                <Box>
                  <p onClick={handleRegister}>Register</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default Login;