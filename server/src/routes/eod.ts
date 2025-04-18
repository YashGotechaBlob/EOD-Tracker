import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Sample commits for testing
const sampleCommits = [
  {
    sha: '1234567890abcdef',
    commit: {
      message: '[Feature] Implemented user authentication with GitHub OAuth',
      author: {
        date: new Date().toISOString()
      }
    },
    html_url: 'https://github.com/sample/repo/commit/1234567890abcdef'
  },
  {
    sha: 'abcdef1234567890',
    commit: {
      message: '[Fix] Resolved CORS issues in API endpoints',
      author: {
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      }
    },
    html_url: 'https://github.com/sample/repo/commit/abcdef1234567890'
  },
  {
    sha: '9876543210fedcba',
    commit: {
      message: '[Update] Added error handling for API requests',
      author: {
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
      }
    },
    html_url: 'https://github.com/sample/repo/commit/9876543210fedcba'
  }
];

// Get commits for a specific date
router.get('/commits/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    // For testing purposes, return sample commits instead of fetching from GitHub
    res.json(sampleCommits);

    /* Commented out actual GitHub API call for testing
    // Get user's GitHub username
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const username = userResponse.data.login;

    // Get user's commits for the specified date
    const since = new Date(date);
    since.setHours(0, 0, 0, 0);
    
    const until = new Date(date);
    until.setHours(23, 59, 59, 999);

    const commitsResponse = await axios.get(
      `https://api.github.com/search/commits?q=author:${username}+author-date:${since.toISOString()}..${until.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.cloak-preview',
        },
      }
    );

    res.json(commitsResponse.data.items);
    */
  } catch (error) {
    console.error('Error fetching commits:', error);
    res.status(500).json({ error: 'Failed to fetch commits' });
  }
});

// Sample EOD reports for testing
const sampleEODs = [
  {
    date: new Date().toISOString().split('T')[0],
    summary: 'Implemented user authentication and fixed several API-related issues.',
    commits: sampleCommits,
    saved: true
  }
];

// Save EOD report
router.post('/', async (req, res) => {
  try {
    const { date, summary, commits } = req.body;
    
    // Store in sample data
    sampleEODs.push({
      date,
      summary,
      commits,
      saved: true
    });

    res.json({
      date,
      summary,
      commits,
      saved: true
    });
  } catch (error) {
    console.error('Error saving EOD:', error);
    res.status(500).json({ error: 'Failed to save EOD report' });
  }
});

// Get EOD report for a specific date
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    
    // Return sample EOD if it exists
    const eod = sampleEODs.find(e => e.date === date);
    
    if (eod) {
      res.json(eod);
    } else {
      res.json({
        date,
        summary: '',
        commits: [],
        saved: false
      });
    }
  } catch (error) {
    console.error('Error fetching EOD:', error);
    res.status(500).json({ error: 'Failed to fetch EOD report' });
  }
});

export const eodRouter = router; 