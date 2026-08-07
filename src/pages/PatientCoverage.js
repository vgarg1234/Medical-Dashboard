import React, { useState } from 'react';
import {
  Box, Typography, TextField, InputAdornment, Paper, Stack, Chip, Divider, Grid,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

const PATIENTS = [
  { id: 1,  name: 'CHRISTINE TAMBORRA', dob: '07/10/1954', payer: 'Aetna',               plan: 'MEDICARE (P01) ESA PPO PLAN', memberId: '102246421700', coverageStart: '01/01/2026', network: 'In-Network',     status: 'Active',              visitDate: 'Jun 2, 2026' },
  { id: 2,  name: 'CHEYENNE LEEMAN',    dob: '03/19/1994', payer: 'CIGNA',               plan: 'CIGNA PPO PLAN',              memberId: 'U5979751801',  coverageStart: '01/01/2026', network: 'In-Network',     status: 'Inactive',            visitDate: 'Jun 2, 2026' },
  { id: 3,  name: 'CHARLES MAGUIRE',    dob: '05/22/1958', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '1EG4TE5MK72',  coverageStart: '07/01/2022', network: 'In-Network',     status: 'Inactive',            visitDate: 'Jun 2, 2026' },
  { id: 4,  name: 'MARGARET ANDERSON',  dob: '09/07/1953', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '3HT7RE6NL91',  coverageStart: '01/01/2020', network: 'In-Network',     status: 'Verification Failed', visitDate: 'May 14, 2026' },
  { id: 5,  name: 'ALBERTA LEO',        dob: '06/30/1955', payer: 'Connecticare',        plan: 'CONNECTICARE PPO',            memberId: 'C4421985600',  coverageStart: '01/01/2026', network: 'In-Network',     status: 'Inactive',            visitDate: 'Jun 1, 2026' },
  { id: 6,  name: 'SCOTT DRESSER',      dob: '11/04/1969', payer: 'Connecticare Medicare', plan: 'CONNECTICARE MEDICARE HMO', memberId: 'H9834521100', coverageStart: '01/01/2026',  network: 'Out-of-Network', status: 'Inactive',            visitDate: 'Jun 2, 2026' },
];

function StatusChip({ status }) {
  if (status === 'Active') return (
    <Chip icon={<CheckCircleRoundedIcon style={{ fontSize: 13, color: '#16a34a' }} />} label="Active" size="small"
      sx={{ backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: 12, borderRadius: '999px', '& .MuiChip-icon': { ml: '6px' } }} />
  );
  if (status === 'Inactive') return (
    <Chip icon={<CancelRoundedIcon style={{ fontSize: 13, color: '#dc2626' }} />} label="Inactive" size="small"
      sx={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', fontWeight: 600, fontSize: 12, borderRadius: '999px', '& .MuiChip-icon': { ml: '6px' } }} />
  );
  return (
    <Chip label="Verification Failed" size="small"
      sx={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontWeight: 600, fontSize: 11, borderRadius: '999px' }} />
  );
}

function InfoField({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.2}>
      <Box sx={{ color: '#4a6cf7', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Typography>
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{value}</Typography>
      </Box>
    </Stack>
  );
}

export default function PatientCoverage() {
  const [search, setSearch]       = useState('');
  const [selectedPatient, setSelected] = useState(null);

  const results = search.trim().length >= 1
    ? PATIENTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.payer.toLowerCase().includes(search.toLowerCase()) ||
        p.memberId.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
          Patient Coverage Details
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Search for a patient to view their eligibility details
        </Typography>
      </Box>

      {/* Centered search hero */}
      {!selectedPatient && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 3 }}>
          {/* Big search icon */}
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%',
            backgroundColor: '#e8f0fe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 2.5,
          }}>
            <SearchRoundedIcon sx={{ fontSize: 38, color: '#4a6cf7' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a5f', mb: 1 }}>
            Search for a Patient
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
            Find a patient by name, subscriber ID to view their eligibility details
          </Typography>

          {/* Search bar */}
          <Box sx={{ width: '100%', maxWidth: 720, position: 'relative' }}>
            <TextField
              fullWidth
              autoFocus
              placeholder="Search by patient name, subscriber ID, or payer..."
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(null); }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5, bgcolor: '#fff', fontSize: 14,
                  py: 0.5,
                  '& fieldset': { borderColor: '#4a6cf7', borderWidth: 1.5 },
                  '&:hover fieldset': { borderColor: '#4a6cf7' },
                  '&.Mui-focused fieldset': { borderColor: '#4a6cf7', borderWidth: 2 },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Dropdown results */}
            {results.length > 0 && (
              <Paper elevation={3} sx={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                borderRadius: 2, border: '1.5px solid #e2e8f0', mt: 0.5, overflow: 'hidden',
              }}>
                {results.map((p, i) => (
                  <Box key={p.id} onClick={() => { setSelected(p); setSearch(p.name); }}
                    sx={{
                      px: 2.5, py: 1.8, cursor: 'pointer',
                      borderBottom: i < results.length - 1 ? '1px solid #f1f5f9' : 'none',
                      '&:hover': { bgcolor: '#f0f4ff' },
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PersonRoundedIcon sx={{ fontSize: 18, color: '#4a6cf7' }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{p.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>DOB: {p.dob} · {p.payer}</Typography>
                      </Box>
                    </Stack>
                    <StatusChip status={p.status} />
                  </Box>
                ))}
              </Paper>
            )}
          </Box>

          {/* Empty state card */}
          {!selectedPatient && results.length === 0 && (
            <Paper elevation={0} sx={{
              mt: 2, width: '100%', maxWidth: 720,
              borderRadius: 3, border: '1.5px solid #e2e8f0',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              py: 6, px: 3,
            }}>
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
              }}>
                <PersonRoundedIcon sx={{ fontSize: 28, color: '#94a3b8' }} />
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                Patient's data will appear here
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Search for a patient or select from{' '}
                <Typography component="span" variant="body2" sx={{ color: '#4a6cf7', fontWeight: 600 }}>
                  Upcoming Patient Visits
                </Typography>
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      {/* Patient Detail Card */}
      {selectedPatient && (
        <Box>
          {/* Search bar (compact, above detail) */}
          <Box sx={{ mb: 3, maxWidth: 520 }}>
            <TextField
              fullWidth
              placeholder="Search by patient name, subscriber ID, or payer..."
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(null); }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5, bgcolor: '#fff', fontSize: 13.5,
                  '& fieldset': { borderColor: '#4a6cf7', borderWidth: 1.5 },
                  '&:hover fieldset': { borderColor: '#4a6cf7' },
                  '&.Mui-focused fieldset': { borderColor: '#4a6cf7', borderWidth: 2 },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Coverage status banner */}
          <Box sx={{
            px: 3, py: 2, mb: 3, borderRadius: 3,
            backgroundColor: selectedPatient.status === 'Active' ? '#f0fdf4' : '#fef2f2',
            border: `1.5px solid ${selectedPatient.status === 'Active' ? '#bbf7d0' : '#fecaca'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
          }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <CheckCircleRoundedIcon sx={{ fontSize: 22, color: selectedPatient.status === 'Active' ? '#16a34a' : '#dc2626' }} />
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: selectedPatient.status === 'Active' ? '#15803d' : '#dc2626' }}>
                  {selectedPatient.status === 'Active' ? 'Active Coverage' : selectedPatient.status}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: '#64748b' }}>
                  Plan: <strong>{selectedPatient.plan}</strong> · Network: <strong>{selectedPatient.network}</strong> · Visit: <strong>{selectedPatient.visitDate}</strong>
                </Typography>
              </Box>
            </Stack>
            <StatusChip status={selectedPatient.status} />
          </Box>

          {/* Detail panels */}
          <Grid container spacing={3}>
            {/* Left: Patient & Plan */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
                <Box sx={{
                  px: 3, py: 2,
                  background: 'linear-gradient(135deg, #4a6cf7, #7c3aed)',
                  display: 'flex', alignItems: 'center', gap: 1.5,
                }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: '11px', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PersonRoundedIcon sx={{ fontSize: 22, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{selectedPatient.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>DOB: {selectedPatient.dob}</Typography>
                  </Box>
                </Box>

                <Box sx={{ px: 3, py: 2.5 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.7, textTransform: 'uppercase', mb: 1.5 }}>Patient Information</Typography>
                  <Stack spacing={2}>
                    <InfoField icon={<PersonRoundedIcon sx={{ fontSize: 15 }} />} label="Full Name" value={selectedPatient.name} />
                    <InfoField icon={<CalendarTodayRoundedIcon sx={{ fontSize: 15 }} />} label="Date of Birth" value={selectedPatient.dob} />
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.7, textTransform: 'uppercase', mb: 1.5 }}>Insurance Plan</Typography>
                  <Stack spacing={2}>
                    <InfoField icon={<LocalHospitalRoundedIcon sx={{ fontSize: 15 }} />} label="Payer" value={selectedPatient.payer} />
                    <InfoField icon={<BadgeRoundedIcon sx={{ fontSize: 15 }} />} label="Plan" value={selectedPatient.plan} />
                    <InfoField icon={<BadgeRoundedIcon sx={{ fontSize: 15 }} />} label="Member ID" value={selectedPatient.memberId} />
                    <InfoField icon={<CalendarTodayRoundedIcon sx={{ fontSize: 15 }} />} label="Coverage Start" value={selectedPatient.coverageStart} />
                    <InfoField icon={<CheckCircleRoundedIcon sx={{ fontSize: 15 }} />} label="Network" value={selectedPatient.network} />
                  </Stack>
                </Box>
              </Paper>
            </Grid>

            {/* Right: Coverage summary */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Coverage Summary</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', mt: 0.3 }}>Eligibility details for {selectedPatient.name}</Typography>
                </Box>

                <Box sx={{ px: 3, py: 2.5 }}>
                  {/* Summary cards */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                      { label: 'Deductible',        value: '—', sub: 'Not available',  accent: '#e8f0fe', color: '#4a6cf7' },
                      { label: 'Out-of-Pocket Max',  value: '—', sub: 'Not available',  accent: '#e6f9f0', color: '#16a34a' },
                      { label: 'Copay',              value: '—', sub: 'Not available',  accent: '#fef9e6', color: '#d97706' },
                      { label: 'Coinsurance',        value: '—', sub: 'Not available',  accent: '#fde8e8', color: '#dc2626' },
                    ].map(item => (
                      <Grid item xs={6} key={item.label}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: '1.5px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', backgroundColor: item.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 800, color: item.color }}>$</Typography>
                          </Box>
                          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6 }}>{item.label}</Typography>
                          <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, mt: 0.3 }}>{item.value}</Typography>
                          <Typography sx={{ fontSize: 11.5, color: '#94a3b8', mt: 0.3 }}>{item.sub}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ mb: 2 }} />

                  {/* Plan details table */}
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a', mb: 1.5 }}>Plan Details</Typography>
                  {[
                    { label: 'Insurance Payer',  value: selectedPatient.payer },
                    { label: 'Plan Name',        value: selectedPatient.plan },
                    { label: 'Member ID',        value: selectedPatient.memberId },
                    { label: 'Coverage Start',   value: selectedPatient.coverageStart },
                    { label: 'Network Status',   value: selectedPatient.network },
                    { label: 'Coverage Status',  value: selectedPatient.status },
                  ].map((row, i) => (
                    <Box key={i} sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      py: 1.1, borderBottom: '1px solid #f1f5f9',
                    }}>
                      <Typography sx={{ fontSize: 13, color: '#64748b' }}>{row.label}</Typography>
                      {row.label === 'Coverage Status'
                        ? <StatusChip status={row.value} />
                        : <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{row.value}</Typography>
                      }
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
