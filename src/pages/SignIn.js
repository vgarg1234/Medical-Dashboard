import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper,
  InputAdornment, IconButton, Divider, Stack, Chip,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const FEATURES = [
  'Real-time eligibility verification',
  'Automated coverage checks',
  'Patient visit management',
  'Provider fee scheduling',
];

export default function SignIn({ onSignIn }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignIn) onSignIn();
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      bgcolor: '#f0f4ff',
    }}>

      {/* ── Left Panel ── */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '48%',
        background: 'linear-gradient(145deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%)',
        p: 6,
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Background decoration circles */}
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position:  'absolute', top: '40%', left: '60%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, zIndex: 1 }}>
          <Box sx={{
                  width: 42, height: 42, borderRadius: '11px',
            bgcolor: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <Box component="img" src="/AppliteLogo.webp" alt=""
              sx={{ width: 30, height: 30, objectFit: 'contain' }} />
          </Box>
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
            Applite
          </Typography>
        </Box>

        {/* Center content */}    
        <Box sx={{ zIndex: 1 }}>
          <Chip label="Healthcare Platform" size="small" sx={{
            bgcolor: 'rgba(255,255,255,0.15)', color: '#bfdbfe',
            fontWeight: 600, fontSize: 12, mb: 3, border: '1px solid rgba(255,255,255,0.2)',
          }} />
          <Typography sx={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1.2, mb: 2, letterSpacing: -1 }}>
            Streamline Your<br />
            <Box component="span" sx={{
              background: 'linear-gradient(90deg, #93c5fd, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Eligibility Checks
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 1.7 }}>
            Verify patient coverage in real-time, manage appointments, and streamline your front desk workflow.
          </Typography>

          <Stack spacing={1.5}>
            {FEATURES.map(f => (
              <Stack key={f} direction="row" alignItems="center" spacing={1.2}>
                <Box sx={{
                  width: 22, height: 22, borderRadius: '6px',
                  bgcolor: 'rgba(96,165,250,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 14, color: '#93c5fd' }} />
                </Box>
                <Typography sx={{ fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>{f}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Bottom org info */}
        <Box sx={{
          zIndex: 1, display: 'flex', alignItems: 'center', gap: 1.5,
          bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 2.5,
          border: '1px solid rgba(255,255,255,0.12)', px: 2, py: 1.5,
        }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #6d28d9, #4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 14, color: '#fff',
          }}>
            AH
          </Box>
          <Box>
            <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>Applite Health</Typography>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Healthcare Management System</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Right Panel ── */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, sm: 4 },
        pt: { xs: 3, sm: 3 },
      }}>
        <Box sx={{ width: '100%', maxWidth: 420 }}>

          {/* Logo — shown on all screen sizes above form */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 42, height: 42, borderRadius: '11px',
              bgcolor: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(99,102,241,0.2)',
            }}>
              <Box component="img" src="/AppliteLogo.webp" alt=""
                sx={{ width: 30, height: 30, objectFit: 'contain' }} />
            </Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}></Typography>
          </Box>

          {/* Heading */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -0.8, mb: 0.8 }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#64748b' }}>
              Sign in to your Applite Health account
            </Typography>
          </Box>

          {/* Form card */}
          <Paper elevation={0} sx={{
            p: 3.5, borderRadius: 4,
            border: '1.5px solid #e2e8f0',
            bgcolor: '#fff',
            boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
          }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>

                {/* Email */}
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151', mb: 0.8 }}>
                    Email address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="you@applitehealth.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    size="small"
                    type="email"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5, bgcolor: '#f8fafc', fontSize: 14,
                        '& fieldset': { borderColor: '#e2e8f0' },
                        '&:hover fieldset': { borderColor: '#6366f1' },
                        '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                        '&.Mui-focused': { bgcolor: '#fff' },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon sx={{ fontSize: 17, color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Password</Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#6366f1', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                      Forgot password?
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    size="small"
                    type={showPass ? 'text' : 'password'}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5, bgcolor: '#f8fafc', fontSize: 14,
                        '& fieldset': { borderColor: '#e2e8f0' },
                        '&:hover fieldset': { borderColor: '#6366f1' },
                        '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                        '&.Mui-focused': { bgcolor: '#fff' },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon sx={{ fontSize: 17, color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPass(v => !v)} edge="end" sx={{ color: '#94a3b8' }}>
                            {showPass
                              ? <VisibilityOffRoundedIcon sx={{ fontSize: 17 }} />
                              : <VisibilityRoundedIcon sx={{ fontSize: 17 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Submit */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 0.5, py: 1.3, borderRadius: 2.5,
                    textTransform: 'none', fontWeight: 700, fontSize: 15,
                    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4a6cf7, #7c3aed)',
                    boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
                    '&:hover': { boxShadow: '0 6px 22px rgba(99,102,241,0.55)' },
                  }}
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>

              </Stack>
            </form>

            <Divider sx={{ my: 2.5, color: '#94a3b8', fontSize: 12 }}>or continue with</Divider>

            {/* SSO button */}
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.1, borderRadius: 2.5, textTransform: 'none',
                fontWeight: 600, fontSize: 14,
                borderColor: '#e2e8f0', color: '#374151', bgcolor: '#f8fafc',
                '&:hover': { borderColor: '#6366f1', bgcolor: '#f0f4ff', color: '#6366f1' },
              }}
            >
              Single Sign-On (SSO)
            </Button>
          </Paper>

          {/* Footer note */}
          <Typography sx={{ textAlign: 'center', fontSize: 12.5, color: '#94a3b8', mt: 3 }}>
            Protected by enterprise-grade security.{' '}
            <Typography component="span" sx={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
