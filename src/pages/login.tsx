import React, { useState } from 'react';
import adultReader from '../assets/library2.png'; // Adjust path as needed

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Container,
  Grid,
  Link,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log(errorData);
        throw new Error(errorData?.message || 'Login failed');
      }
      const data = await response.json();
      console.log(data);

      // Store token and login status
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);       
        localStorage.setItem('isLoggedIn', 'true');
      }
      setSuccess('Login successful! Redirecting...');

      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (err) {
      setError(`Login failed: ${err instanceof Error ? err.message : 'Invalid credentials'}`);
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p:5,  display: 'flex' }}>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container>
          {/* Image section - takes 2/3 of the space on larger screens */}
          {!isMobile && (
            <Grid item xs={12} md={8} sx={{ height: '80vh' }}>
              <Box 
                sx={{ 
                  height: '100%', 
                  backgroundImage: `url(${adultReader})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Grid>
          )}
          
          {/* Form section - takes 1/3 on larger screens, full width on mobile */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p:4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Login
              </Typography>
              
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 2 }}>
                  <Link href="signup" variant="body2" sx={{ fontWeight: 'bold' }}>
                    Don't have an account
                  </Link>
                  <Link href="resetPassword" variant="body2" sx={{ fontWeight: 'bold' }}>
                    Forgot your Password
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 2, py: 1.5 }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;