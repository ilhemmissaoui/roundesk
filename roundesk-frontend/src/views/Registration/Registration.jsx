import React, { Fragment, useState } from 'react';
import {Container, Grid, Button, Box, TextField, Typography, Select, MenuItem} from "@mui/material"
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email must be a valid email";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 8) {
      errors.password = "Password must be longer than or equal to 8 characters";
    }
    if (!role.trim()) {
      errors.role = "Role is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const RegistrationClick = async () => {
    if (validateForm()) {
      const formData = { "username": username, "email": email, "password": password, "role": role };

      try {
        const response = await fetch('http://localhost:3003/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/login');
        } else {
          console.error('Failed to register');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const LoginClick = () => {
    navigate('/login');
  };

  return (
    <Fragment>
      <Box sx={{ background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%" }}>
        <Container alignItems="center" >
          <Grid container sx={{ height: "100vh", alignItems: "center", justifyContent: "center", }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{ background: "white", boxShadow: 3, borderRadius: 3, p: 3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Registration
              </Typography>
              <Box my={3}><TextField name="username" label="Username" variant="outlined" fullWidth value={username} onChange={handleUsernameChange} error={Boolean(errors.username)} helperText={errors.username} />
              </Box>
              <Box>
                <TextField name="email" label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} error={Boolean(errors.email)} helperText={errors.email} />
              </Box>
              <Box my={3}><TextField name="password" label="Password" variant="outlined" fullWidth type="password" value={password} onChange={handlePasswordChange} error={Boolean(errors.password)} helperText={errors.password} />
              </Box>
              <Box my={3}>
                <Select
                  name="role"
                  variant="outlined"
                  fullWidth
                  value={role}
                  onChange={handleRoleChange}
                  error={Boolean(errors.role)}
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                </Select>
                {errors.role && <p>{errors.role}</p>}
              </Box>
              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px' }}>
                <Button fullWidth sx={{ color: "white" }} onClick={RegistrationClick}>Registration</Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}>
                <Box display="flex">
                  <p onClick={LoginClick}>login</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default Registration;