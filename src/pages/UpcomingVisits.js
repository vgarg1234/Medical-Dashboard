import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment,
  Select, MenuItem, FormControl, Chip, Paper, Stack, Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import FileDownloadIcon from '@mui/icons-material/FileDownloadRounded';
import UploadFileIcon from '@mui/icons-material/UploadFileRounded';
import FilterListIcon from '@mui/icons-material/FilterListRounded';
import RefreshIcon from '@mui/icons-material/RefreshRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorRounded';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmptyRounded';
import EventBusyIcon from '@mui/icons-material/EventBusyRounded';
import WarningAmberIcon from '@mui/icons-material/WarningRounded';


const STAT_CARDS = [
  {
    label: 'Total Appointments',
    value: 0,
    icon: <CalendarMonthIcon />,
    gradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    iconColor: '#7c3aed',
  },
  {
    label: 'Eligibility Verified',
    value: 0,
    icon: <CheckCircleOutlineIcon />,
    gradient: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    iconColor: '#16a34a',
  },
  {
    label: 'Pending Verification',
    value: 0,
    icon: <HourglassEmptyIcon />,
    gradient: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
    iconColor: '#ea580c',
  },
  {
    label: 'Verification Failed',
    value: 0,
    icon: <ErrorOutlineIcon />,
    gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    iconColor: '#dc2626',
  },
];

export default function UpcomingVisits() {
  const [search, setSearch] = useState('');
  const [visitType, setVisitType] = useState('all');
  const [payer, setPayer] = useState('all');
  const [failuresOnly, setFailuresOnly] = useState(false);
  const [todayOnly, setTodayOnly] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const now = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1, overflowX: 'hidden' }}>

      {/* ── Page Header ── */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
            Upcoming Patient Visits
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Review upcoming appointments and verify coverage status
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Last updated: {now}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 13,
              borderColor: '#e2e8f0',
              color: '#6366f1',
              '&:hover': { borderColor: '#6366f1', bgcolor: '#f0f4ff' },
            }}
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      {/* ── Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3.5 }}>
        {STAT_CARDS.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Paper elevation={0} sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1.5px solid #e9eef8',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              boxShadow: '0 2px 10px rgba(99,102,241,0.05)',
            }}>
              <Box sx={{
                width: 48, height: 48,
                borderRadius: '12px',
                background: s.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: s.iconColor,
              }}>
                {s.icon}
              </Box>
              <Box>
                <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                  {s.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ── Toolbar ── */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <TextField
          placeholder="Search by patient name, payer, or subscriber ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{
            flex: '1 1 220px',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
              bgcolor: '#fff',
              fontSize: 13.5,
              '& fieldset': { borderColor: '#e2e8f0' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 700, fontSize: 13.5, px: 2.5,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
            whiteSpace: 'nowrap',
            '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.5)' },
          }}
        >
          Check Eligibility
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon sx={{ color: '#6366f1' }} />}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: 13,
            borderColor: '#e2e8f0', color: '#374151', bgcolor: '#fff',
            whiteSpace: 'nowrap',
            '&:hover': { borderColor: '#6366f1', bgcolor: '#f8fafc' },
          }}
        >
          Download Template
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon sx={{ color: '#6366f1' }} />}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: 13,
            borderColor: '#e2e8f0', color: '#374151', bgcolor: '#fff',
            whiteSpace: 'nowrap',
            '&:hover': { borderColor: '#6366f1', bgcolor: '#f8fafc' },
          }}
        >
          Upload File
        </Button>
      </Stack>

      {/* ── Filters ── */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <FilterListIcon sx={{ fontSize: 16, color: '#6366f1' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Filters:</Typography>
        </Box>

        <FormControl size="small">
          <Select
            value={visitType}
            onChange={e => setVisitType(e.target.value)}
            sx={{
              borderRadius: 2, fontSize: 13, bgcolor: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
            }}
          >
            <MenuItem value="all">All Visit Types</MenuItem>
            <MenuItem value="new">New Patient</MenuItem>
            <MenuItem value="follow-up">Follow-Up</MenuItem>
            <MenuItem value="consultation">Consultation</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <Select
            value={payer}
            onChange={e => setPayer(e.target.value)}
            sx={{
              borderRadius: 2, fontSize: 13, bgcolor: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
            }}
          >
            <MenuItem value="all">All Payers</MenuItem>
            <MenuItem value="medicare">Medicare</MenuItem>
            <MenuItem value="medicaid">Medicaid</MenuItem>
            <MenuItem value="bcbs">Blue Cross Blue Shield</MenuItem>
            <MenuItem value="aetna">Aetna</MenuItem>
            <MenuItem value="united">United Health</MenuItem>
          </Select>
        </FormControl>

        <Chip
          icon={<WarningAmberIcon sx={{ fontSize: '14px !important' }} />}
          label="Verification Failures Only"
          onClick={() => setFailuresOnly(!failuresOnly)}
          variant={failuresOnly ? 'filled' : 'outlined'}
          sx={{
            fontSize: 12.5, fontWeight: 500,
            borderColor: failuresOnly ? '#6366f1' : '#e2e8f0',
            bgcolor: failuresOnly ? '#f0f4ff' : '#fff',
            color: failuresOnly ? '#6366f1' : '#374151',
            '& .MuiChip-icon': { color: failuresOnly ? '#6366f1' : '#94a3b8' },
            '&:hover': { bgcolor: '#f0f4ff', borderColor: '#6366f1' },
            cursor: 'pointer',
          }}
        />
        <Chip
          icon={<CalendarMonthIcon sx={{ fontSize: '14px !important' }} />}
          label="Today Only"
          onClick={() => setTodayOnly(!todayOnly)}
          variant={todayOnly ? 'filled' : 'outlined'}
          sx={{
            fontSize: 12.5, fontWeight: 500,
            borderColor: todayOnly ? '#6366f1' : '#e2e8f0',
            bgcolor: todayOnly ? '#f0f4ff' : '#fff',
            color: todayOnly ? '#6366f1' : '#374151',
            '& .MuiChip-icon': { color: todayOnly ? '#6366f1' : '#94a3b8' },
            '&:hover': { bgcolor: '#f0f4ff', borderColor: '#6366f1' },
            cursor: 'pointer',
          }}
        />
      </Stack>

      {/* ── Date Range + Pagination ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarMonthIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
          <TextField
            type="date"
            size="small"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            sx={{
              width: 150,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, fontSize: 13, bgcolor: '#fff',
                '& fieldset': { borderColor: '#e2e8f0' },
                '&:hover fieldset': { borderColor: '#6366f1' },
              },
            }}
          />
          <Typography sx={{ color: '#cbd5e1', fontSize: 14 }}>–</Typography>
          <TextField
            type="date"
            size="small"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            sx={{
              width: 150,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, fontSize: 13, bgcolor: '#fff',
                '& fieldset': { borderColor: '#e2e8f0' },
                '&:hover fieldset': { borderColor: '#6366f1' },
              },
            }}
          />
        </Stack>
        <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: 13 }}>
          Page 1 of 0 (0 total)
        </Typography>
      </Box>

      {/* ── Empty State Card ── */}
      <Paper elevation={0} sx={{
        borderRadius: 4, border: '1.5px solid #e9eef8',
        boxShadow: '0 2px 16px rgba(99,102,241,0.06)', overflow: 'hidden',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, px: 4, gap: 2 }}>
          <Box sx={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f0f4ff, #e9d5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1,
          }}>
            <EventBusyIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />
          </Box>
          <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#1e293b' }}>No upcoming appointments</Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: -1 }}>There are no upcoming patient visits scheduled yet.</Typography>
          <Button variant="contained" startIcon={<AddIcon />} sx={{
            mt: 1, borderRadius: 2.5, textTransform: 'none', fontWeight: 700, fontSize: 13.5, px: 3,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
            '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.5)' },
          }}>Schedule Appointment</Button>
        </Box>
      </Paper>

    </Box>
  );
}
