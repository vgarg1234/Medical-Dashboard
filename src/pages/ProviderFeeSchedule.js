import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Paper,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';



export default function ProviderFeeSchedule() {
  const [search, setSearch] = useState('');

  return (
    <Box sx={{ p: 4, flex: 1 }}>
      {/* ── Page Header ── */}
      <Box
  sx={{
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    mb: 3.5,
  }}
>
  <Box>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        color: '#0f172a',
        letterSpacing: -0.5,
      }}
    >
      Provider Fee Schedule
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: '#64748b',
        mt: 0.5,
      }}
    >
      Fee Schedule by provider and CPT Code
    </Typography>

  </Box>
  <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              sx={{
                borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: 13,
                borderColor: '#e2e8f0', color: '#6366f1',
                '&:hover': { borderColor: '#6366f1', bgcolor: '#f0f4ff' },
              }}
            >
              Refresh
            </Button>
</Box>

      {/* ── Toolbar ── */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
       <TextField
  placeholder="Search by provider, payer, or CPT Code ..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  size="small"
  fullWidth
  sx={{
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: 38, // Smaller height
      borderRadius: 2,
      bgcolor: '#fff',
      fontSize: 13,
      '& fieldset': {
        borderColor: '#e2e8f0',
      },
      '&:hover fieldset': {
        borderColor: '#6366f1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6366f1',
      },
    },
    '& .MuiOutlinedInput-input': {
      py: 1, // Reduce vertical padding
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon
          sx={{
            fontSize: 16,
            color: '#94a3b8',
          }}
        />
      </InputAdornment>
    ),
  }}
/>
        
      </Stack>

      {/* ── Date Range + Pagination ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2.5,
        }}
      >
        <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: 13 }}>
          Page 1 of 0 (0 total)
        </Typography>
      </Box>

      {/* ── Empty State Card ── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1.5px solid #e9eef8',
          boxShadow: '0 2px 16px rgba(99,102,241,0.06)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 10,
            px: 4,
            gap: 2,
          }}
        >
          <Button
                      variant="contained"
                      startIcon={< AttachMoneyIcon/>}
                      sx={{
                        mt: 1,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: 13.5,
                        px: 3,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                        '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.5)', transform: 'translateY(-1px)' },
                      }}
                      >
                        Add Fee Schedule
                      </Button>
          <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#1e293b' }}>
            No Provider Fee Schedule Found
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: -1 }}>
            There are no fees schedule available at this time.
          </Typography>
           {/* <Button
                      variant="contained"
                      startIcon={< AttachMoneyIcon/>}
                      sx={{
                        mt: 1,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: 13.5,
                        px: 3,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                        '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.5)', transform: 'translateY(-1px)' },
                      }}
                      >
                      </Button> */}
        </Box>
      </Paper>
    </Box>
    );
}
