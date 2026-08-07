import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, CircularProgress } from '@mui/material';
import Layout from './components/layout/Layout';
import UpcomingVisits from './pages/UpcomingVisits';
import PreviousVisits from './pages/PreviousVisits';
import PatientCoverage from './pages/PatientCoverage';
import Provider from './pages/Provider';
import ProviderFeeSchedule from './pages/ProviderFeeSchedule';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';




const theme = createTheme({
  palette: {
    primary: { main: '#6366f1' },
    secondary: { main: '#8b5cf6' },
    background: { default: '#f0f4ff' },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});

const ComingSoon = ({ label }) => (
  <Box sx={{ p: 5 }}>
    <Typography sx={{ color: '#64748b', fontSize: 16 }}>{label} — coming soon</Typography>
  </Box>
);

const PAGE_MAP = {
  upcoming:      <UpcomingVisits />,
  previous:      <PreviousVisits />,
  coverage:      <PatientCoverage />,
  dashboard:     <Dashboard/>,
  provider:     <Provider/>,
  'fee-schedule': <ProviderFeeSchedule />,
};

export default function App() {
  const [activePage, setActivePage] = useState('upcoming');
  const [isSignedIn, setIsSignedIn]   = useState(false);
  const [loading, setLoading]         = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSignedIn(true);
    }, 2200);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(145deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%)',
          gap: 3,
        }}>
          {/* Decorative circles */}
          <Box sx={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{
              width: 52, height: 52, borderRadius: '14px', bgcolor: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)', overflow: 'hidden',
            }}>
              <Box component="img" src="/AppliteLogo.webp" alt="Applite"
                sx={{ width: 36, height: 36, objectFit: 'contain' }} />
            </Box>
            <Typography sx={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Applite</Typography>
          </Box>

          {/* Spinner */}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress
              size={56}
              thickness={3}
              sx={{ color: 'rgba(255,255,255,0.2)', position: 'absolute' }}
              variant="determinate"
              value={100}
            />
            <CircularProgress
              size={56}
              thickness={3}
              sx={{ color: '#a5b4fc' }}
            />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#fff', mb: 0.5 }}>Signing you in…</Typography>
            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Loading your dashboard</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (!isSignedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignIn onSignIn={handleSignIn} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout activePage={activePage} onNavigate={setActivePage} onLogout={() => setIsSignedIn(false)}>
        {PAGE_MAP[activePage]}
      </Layout>
    </ThemeProvider>
  );
}
