import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [recentEODs, setRecentEODs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('github_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // TODO: Fetch recent EODs
    // This is a placeholder
    setRecentEODs([]);
  }, [navigate]);

  const handleCreateEOD = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    navigate(`/eod/${today}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs>
            <Typography variant="h4" component="h1">
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateEOD}
            >
              Create Today's EOD
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent EOD Reports
              </Typography>
              {recentEODs.length === 0 ? (
                <Typography color="text.secondary">
                  No recent EOD reports found. Create your first one!
                </Typography>
              ) : (
                // TODO: Add list of recent EODs
                <Typography>Recent EODs will appear here</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 