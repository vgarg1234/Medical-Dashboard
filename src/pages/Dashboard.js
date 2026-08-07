import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Button, Stack,
  Select, MenuItem, FormControl, Tooltip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorRounded';
import WarningAmberIcon from '@mui/icons-material/WarningRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/CancelRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ALL_PAYER_DATA = [
  { payer: 'BLUE CROSS CT',           appts: 27, inactivePct: 22.22 },
  { payer: 'BCBS Connecticut (Anthem)', appts: 26, inactivePct: 19.23 },
  { payer: 'Aetna',                   appts: 24, inactivePct: 4.17  },
  { payer: 'Connecticare Medicare',   appts: 20, inactivePct: 100   },
  { payer: 'Connecticare',            appts: 20, inactivePct: 100   },
  { payer: 'CIGNA',                   appts: 16, inactivePct: 12.5  },
  { payer: 'Humana',                  appts: 12, inactivePct: 0     },
  { payer: 'Medicare',                appts: 5,  inactivePct: 100   },
  { payer: 'CIGNA Healthcare',        appts: 3,  inactivePct: 0     },
];

const ALL_RISK = [
  { id: 1,  patient: 'CHERYL HUNT',       dos: 'May 14, 2026', payer: 'Medicare',             status: 'Verification Failed' },
  { id: 2,  patient: 'DORIS MUSGRAVE',    dos: 'May 14, 2026', payer: 'Medicare',             status: 'Verification Failed' },
  { id: 3,  patient: 'JANET GODE',        dos: 'May 14, 2026', payer: 'Medicare',             status: 'Verification Failed' },
  { id: 4,  patient: 'MARCIA KEELER',     dos: 'May 14, 2026', payer: 'Medicare',             status: 'Verification Failed' },
  { id: 5,  patient: 'MARGARET ANDERSON', dos: 'May 14, 2026', payer: 'Medicare',             status: 'Verification Failed' },
  { id: 6,  patient: 'ALBERTA LEO',       dos: 'Jun 01, 2026', payer: 'Connecticare',         status: 'Inactive' },
  { id: 7,  patient: 'JUDITH BASTIEN',    dos: 'Jun 01, 2026', payer: 'Connecticare',         status: 'Inactive' },
  { id: 8,  patient: 'SANDRA BURKE',      dos: 'Jun 02, 2026', payer: 'Medicare',             status: 'Inactive' },
  { id: 9,  patient: 'SCOTT DRESSER',     dos: 'Jun 02, 2026', payer: 'Connecticare Medicare',status: 'Inactive' },
  { id: 10, patient: 'WENDI ARNDT',       dos: 'Jun 02, 2026', payer: 'Connecticare Medicare',status: 'Inactive' },
  { id: 11, patient: 'CHEYENNE LEEMAN',   dos: 'Jun 02, 2026', payer: 'CIGNA',               status: 'Inactive' },
];

const PAYER_OPTIONS = ['All Payers', ...new Set(ALL_PAYER_DATA.map(p => p.payer))];
const STATUS_OPTIONS = ['All Statuses', 'Verification Failed', 'Inactive'];

function StatusChip({ status }) {
  const isVerFailed = status === 'Verification Failed';
  return (
    <Chip label={status} size="small"
      icon={isVerFailed
        ? <WarningAmberIcon style={{ fontSize: 13, color: '#b45309' }} />
        : <CancelIcon style={{ fontSize: 13, color: '#dc2626' }} />}
      sx={{
        backgroundColor: isVerFailed ? '#fef3c7' : '#fee2e2',
        color: isVerFailed ? '#b45309' : '#dc2626',
        fontWeight: 600, fontSize: 11, borderRadius: '999px', px: 0.3,
        '& .MuiChip-icon': { ml: '4px' },
      }}
    />
  );
}

function AnimatedBar({ targetWidth, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(targetWidth), 100 + delay);
    return () => clearTimeout(t);
  }, [targetWidth, delay]);
  return (
    <Box sx={{ height: 10, borderRadius: 99, backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      <Box sx={{
        height: '100%', borderRadius: 99,
        backgroundColor: color,
        width: `${width}%`,
        transition: 'width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
        background: color === '#ef4444'
          ? 'linear-gradient(90deg, #f87171, #ef4444)'
          : 'linear-gradient(90deg, #60a5fa, #3b82f6)',
      }} />
    </Box>
  );
}

function StatCard({ s, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: 3,
      border: `1.5px solid ${s.border}`,
      backgroundColor: '#fff',
      minHeight: 148,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      cursor: 'default',
      '&:hover': {
        boxShadow: `0 8px 28px ${s.border}99`,
        transform: 'translateY(-3px)',
        transition: 'all 0.25s ease',
      },
    }}>
      <Box sx={{
        width: 46, height: 46, borderRadius: '12px',
        backgroundColor: s.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: s.iconColor, mb: 1.5,
      }}>
        {s.icon}
      </Box>
      <Typography variant="body2" sx={{ color: '#64748b', mb: 0.4, fontSize: 12.5 }}>{s.label}</Typography>
      <Typography sx={{ fontSize: 30, fontWeight: 800, color: '#0f172a', lineHeight: 1, mb: 0.4 }}>
        {s.value}
      </Typography>
      {s.subtitle && (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {s.trend === 'up' && <TrendingUpIcon sx={{ fontSize: 13, color: '#16a34a' }} />}
          {s.trend === 'down' && <TrendingDownIcon sx={{ fontSize: 13, color: '#dc2626' }} />}
          <Typography variant="caption" sx={{ color: s.trend === 'up' ? '#16a34a' : s.trend === 'down' ? '#dc2626' : '#94a3b8' }}>
            {s.subtitle}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}

export default function Dashboard() {
  const [payerFilter, setPayerFilter]   = useState('All Payers');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [refreshKey, setRefreshKey]     = useState(0);
  const [lastRefresh, setLastRefresh]   = useState(new Date());

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
    setLastRefresh(new Date());
  };

  const filteredPayers = payerFilter === 'All Payers'
    ? ALL_PAYER_DATA
    : ALL_PAYER_DATA.filter(p => p.payer === payerFilter);

  const filteredRisk = ALL_RISK.filter(r => {
    const matchPayer  = payerFilter === 'All Payers' || r.payer === payerFilter;
    const matchStatus = statusFilter === 'All Statuses' || r.status === statusFilter;
    return matchPayer && matchStatus;
  });

  const STAT_CARDS = [
    {
      label: 'Total Appointments', value: filteredRisk.length + 142,
      subtitle: null, trend: null,
      icon: <CalendarMonthIcon sx={{ fontSize: 26 }} />,
      iconBg: '#e8f0fe', iconColor: '#4a6cf7', border: '#e2e8f0',
    },
    {
      label: 'Eligibility Checks Done', value: 246,
      subtitle: '160.8% coverage rate', trend: 'up',
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 26 }} />,
      iconBg: '#e6f9f0', iconColor: '#16a34a', border: '#bbf7d0',
    },
    {
      label: 'Inactive / Not Eligible', value: filteredRisk.filter(r => r.status === 'Inactive').length,
      subtitle: 'Requires attention', trend: 'down',
      icon: <ErrorOutlineIcon sx={{ fontSize: 26 }} />,
      iconBg: '#fde8e8', iconColor: '#dc2626', border: '#fecaca',
    },
    {
      label: 'Not Verified', value: 0,
      subtitle: 'Requires immediate attention', trend: null,
      icon: <WarningAmberIcon sx={{ fontSize: 26 }} />,
      iconBg: '#fef9e6', iconColor: '#d97706', border: '#fde68a',
    },
  ];

  const refreshedTime = lastRefresh.toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
            Eligibility Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Monitor coverage verification and collection status
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }} flexWrap="wrap">
          {/* Payer filter */}
          <FormControl size="small">
            <Select value={payerFilter} onChange={e => setPayerFilter(e.target.value)}
              sx={{ fontSize: 13, bgcolor: '#fff', minWidth: 150, borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
              }}>
              {PAYER_OPTIONS.map(p => <MenuItem key={p} value={p} sx={{ fontSize: 13 }}>{p}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Status filter */}
          <FormControl size="small">
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              sx={{ fontSize: 13, bgcolor: '#fff', minWidth: 150, borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
              }}>
              {STATUS_OPTIONS.map(s => <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Date range pill */}
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            border: '1.5px solid #e2e8f0', borderRadius: 2,
            px: 2, py: 0.9, backgroundColor: '#fff', cursor: 'pointer',
            transition: 'border-color 0.2s',
            '&:hover': { borderColor: '#6366f1' },
          }}>
            <CalendarTodayIcon sx={{ fontSize: 15, color: '#64748b' }} />
            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, fontSize: 13 }}>
              05/11/2026 – 06/10/2026
            </Typography>
          </Box>

          
        </Stack>
      </Box>

  

      <Grid container spacing={2} sx={{ mb: 3 }} key={refreshKey}>
        {STAT_CARDS.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <StatCard s={s} index={i} />
          </Grid>
        ))}
      </Grid>

      {/* Payer Breakdown + Appointments at Risk */}
      <Grid container spacing={2} sx={{ alignItems: 'stretch', mb: 3 }}>

        {/* Payer Breakdown */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper elevation={0} sx={{
            p: 3, borderRadius: 3, border: '1.5px solid #e2e8f0',
            backgroundColor: '#fff', flex: 1,
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: '0 4px 20px rgba(99,102,241,0.08)' },
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Payer Breakdown</Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>{filteredPayers.length} payers</Typography>
            </Stack>
            {filteredPayers.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>No payers match the current filter.</Typography>
              </Box>
            ) : filteredPayers.map((row, i) => (
              <Box key={row.payer} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#0f172a' }}>{row.payer}</Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Typography sx={{ fontSize: 12.5, color: '#475569' }}>{row.appts} appts</Typography>
                    {row.inactivePct > 0 && (
                      <Typography sx={{ fontSize: 12.5, color: '#ef4444', fontWeight: 700 }}>
                        {row.inactivePct}% inactive
                      </Typography>
                    )}
                  </Box>
                </Box>
                <AnimatedBar
                  key={refreshKey}
                  targetWidth={Math.min((row.appts / 30) * 100, 100)}
                  color={row.inactivePct > 0 ? '#ef4444' : '#3b82f6'}
                  delay={i * 80}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Appointments at Risk */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper elevation={0} sx={{
            p: 3, borderRadius: 3, border: '1.5px solid #e2e8f0',
            backgroundColor: '#fff', flex: 1, display: 'flex', flexDirection: 'column',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: '0 4px 20px rgba(99,102,241,0.08)' },
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Appointments at Risk</Typography>
              <Chip label={`${filteredRisk.length} records`} size="small"
                sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontWeight: 600, fontSize: 11 }} />
            </Stack>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              Patients requiring immediate attention for coverage issues
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.5fr', pb: 1, mb: 1, borderBottom: '1px solid #e2e8f0' }}>
              {['PATIENT', 'DOS', 'PAYER', 'STATUS'].map(h => (
                <Typography key={h} sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.5 }}>{h}</Typography>
              ))}
            </Box>

            <Box sx={{ overflowY: 'auto', maxHeight: 380, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              {filteredRisk.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>No appointments match the current filters.</Typography>
                </Box>
              ) : filteredRisk.map((row, i) => (
                <Box key={row.id} sx={{
                  display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.5fr',
                  py: 1.1, borderBottom: '1px solid #f1f5f9', alignItems: 'center',
                  backgroundColor: i % 2 === 1 ? '#f8faff' : 'transparent',
                  borderRadius: 1, px: 0.5,
                  opacity: 0,
                  '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${i * 40}ms`,
                }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: '#0f172a' }}>{row.patient}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{row.dos}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#475569' }}>{row.payer}</Typography>
                  <StatusChip status={row.status} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Front Desk Priority Actions */}
      <Box sx={{
        p: 3, borderRadius: 3,
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #6d28d9 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5, zIndex: 1, position: 'relative' }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '10px',
            bgcolor: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <WarningAmberIcon sx={{ fontSize: 18, color: '#fbbf24' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              Front Desk Priority Actions
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Key metrics requiring your attention today
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Not Verified',          value: 0,        valueColor: '#fff',    subtitle: 'Check eligibility before visit',  accent: 'rgba(255,255,255,0.1)' },
            { label: 'Coverage Rate',          value: '160.8%', valueColor: '#86efac', subtitle: 'Target: 95%',                     accent: 'rgba(134,239,172,0.15)' },
            { label: 'At Risk Appointments',   value: filteredRisk.length, valueColor: '#fca5a5', subtitle: 'Requires immediate follow-up', accent: 'rgba(252,165,165,0.15)' },
          ].map((item) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <Paper elevation={0} sx={{
                p: 2.5, borderRadius: 2.5,
                backgroundColor: item.accent,
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': { transform: 'translateY(-3px)', backgroundColor: 'rgba(255,255,255,0.18)' },
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, mb: 0.5, fontSize: 12.5 }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 34, fontWeight: 800, color: item.valueColor, lineHeight: 1, mb: 0.5 }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {item.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}
