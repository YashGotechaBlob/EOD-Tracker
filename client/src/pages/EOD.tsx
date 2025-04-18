import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

export default function EOD() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [commits, setCommits] = useState<Commit[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const token = localStorage.getItem('github_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:3000/eod/commits/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch commits');
        
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [date, navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('github_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/eod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          summary,
          commits: commits.map(c => ({
            sha: c.sha,
            message: c.commit.message,
            url: c.html_url,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to save EOD');
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving EOD:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          EOD Report - {format(new Date(date || ''), 'MMMM d, yyyy')}
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Daily Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a summary of your day..."
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Today's Commits
          </Typography>
          {loading ? (
            <Typography>Loading commits...</Typography>
          ) : commits.length === 0 ? (
            <Typography color="text.secondary">
              No commits found for today.
            </Typography>
          ) : (
            <List>
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={commit.commit.message}
                      secondary={format(
                        new Date(commit.commit.author.date),
                        'h:mm a'
                      )}
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          )}
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save EOD Report
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 