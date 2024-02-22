import React, { Fragment, useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token available');
          return;
        }

        const response = await fetch('http://localhost:3003/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Fragment>
      {profileData ? (
        <Box sx={{ background: '#f0f2f5', minHeight: '100vh', padding: '50px 0' }}>
          <Container maxWidth="md">
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                  User Profile
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="#fff" p={3} borderRadius={5} boxShadow={3}>
                  <Typography variant="h6">Username:</Typography>
                  <Typography variant="body1">{profileData.username}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="#fff" p={3} borderRadius={5} boxShadow={3}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1">{profileData.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="#fff" p={3} borderRadius={5} boxShadow={3}>
                  <Typography variant="h6">Role:</Typography>
                  <Typography variant="body1">{profileData.role}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Typography variant="body1" align="center">Loading profile...</Typography>
      )}
    </Fragment>
  );
};

export default Dashboard;