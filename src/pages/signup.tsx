import React, { useState } from 'react';
import adultReader from '../assets/shelf2.png'; // Adjust path as needed

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'client',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      role: e.target.value
    });
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          password: formData.password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Response error details:', errorData);
        console.log(formData.role);
        // Display the specific error message from the API to the user
        setError(errorData.message || (errorData.errors && errorData.errors[0]?.message) || 'Registration failed');
        return;
      }
      setSuccess('Signup successful! Redirecting to verification page...');
      // Redirect to verify email page after successful signup
      setTimeout(() => {
        window.location.href = '/verifyEmail';
      }, 2000);
      
    } catch (err) {
      setError('Failed to sign up. Please try again later.');
      console.error('Signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{  display: 'flex', p:5 }}>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Grid container>
          {/* Image section - takes 2/3 of the space */}
          <Grid item xs={12} md={8} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                height: '700px', 
                backgroundImage: `url(${adultReader})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Grid>
          
          {/* Form section - takes 1/3 on larger screens, full width on mobile */}
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                p: 4, 
                height: { xs: 'auto', md: '700px' }, 
                display: 'flex', 
                flexDirection: 'column'
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Signup
              </Typography>
              
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="client">Client</MenuItem>
                    <MenuItem value="publisher">Publisher</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Link href="login" underline="hover" sx={{ fontWeight: 'medium' }}>
                    Already have an account
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ 
                    mt: 2, 
                    mb: 2,
                    py: 1.5,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;