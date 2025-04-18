import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/github', (req, res) => {
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.API_URL}/auth/callback`;
  const scope = 'repo user';
  
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  console.log('Redirecting to GitHub:', githubUrl);
  res.redirect(githubUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  console.log('Received code from GitHub:', code);
  
  try {
    console.log('Exchanging code for token...');
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = response.data.access_token;
    console.log('Received access token');
    
    // Get user data to verify token works
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Verified user:', userResponse.data.login);

    // Redirect back to frontend with token
    const redirectUrl = `${process.env.CLIENT_URL}/login?token=${accessToken}`;
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
  }
});

export const authRouter = router; 