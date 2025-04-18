import { Button, Container, Typography, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for token in URL when redirected back from GitHub
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('github_token', token);
      // Redirect to dashboard
      navigate('/dashboard');
    }
  }, [location, navigate]);

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          EOD Tracker
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center">
          Track your daily progress by automatically collecting your GitHub commits
          and organizing them into meaningful end-of-day reports.
        </Typography>

        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={handleGitHubLogin}
          size="large"
        >
          Sign in with GitHub
        </Button>
      </Box>
    </Container>
  );
} 