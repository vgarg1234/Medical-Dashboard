import React, { useState } from 'react';
import {
  Box, Typography, Paper, Chip, Stack,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Button, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Divider,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';

const PROVIDERS = [
  {
    id: 1, name: 'SHARMILA PARVATHANENI, MD', npi: '1225334840', taxId: '824161434',
    type: 'Individual', status: 'Active', taxIdType: 'EIN', npiStatus: 'Active',
    taxonomies: [{ specialty: 'Internal Medicine', code: '207R00000X', primary: true }],
  },
  {
    id: 2, name: 'SARAH BELCHER', npi: '1124636709', taxId: '851362054',
    type: 'Organization', status: 'Active', taxIdType: 'EIN', npiStatus: 'Active',
    taxonomies: [{ specialty: 'General Practice', code: '208D00000X', primary: true }],
  },
  {
    id: 3, name: 'SHARMILAA BABU', npi: '1386225258', taxId: 'tax123',
    type: 'Individual', status: 'Inactive', taxIdType: 'SSN', npiStatus: 'Inactive',
    taxonomies: [{ specialty: 'Family Medicine', code: '207Q00000X', primary: true }],
  },
  {
    id: 4, name: 'HARJINDER CHOWDHARY', npi: '1013258664', taxId: '461938303',
    type: 'Organization', status: 'Active', taxIdType: 'EIN', npiStatus: 'Active',
    taxonomies: [{ specialty: 'Cardiology', code: '207RI0011X', primary: true }],
  },
  {
    id: 5, name: 'HARKIRAT SAGGU', npi: '1841678539', taxId: '47-2853392',
    type: 'Organization', status: 'Active', taxIdType: 'EIN', npiStatus: 'Active',
    taxonomies: [{ specialty: 'Orthopedic Surgery', code: '207X00000X', primary: true }],
  },
];

const TYPE_COLOR = { Individual: '#6366f1', Organization: '#8b5cf6' };

function StatusChip({ status, size = 'small' }) {
  const active = status === 'Active';
  return (
    <Chip
      icon={active
        ? <CheckCircleRoundedIcon style={{ fontSize: 13, color: '#16a34a' }} />
        : <CancelRoundedIcon style={{ fontSize: 13, color: '#dc2626' }} />}
      label={status}
      size={size}
      sx={{
        backgroundColor: active ? '#dcfce7' : '#fee2e2',
        color: active ? '#16a34a' : '#dc2626',
        border: `1px solid ${active ? '#bbf7d0' : '#fecaca'}`,
        fontWeight: 600, fontSize: 12, borderRadius: '999px',
        '& .MuiChip-icon': { ml: '6px' },
      }}
    />
  );
}

function DetailField({ icon, label, value, accent = '#6366f1' }) {
  return (
    <Paper elevation={0} sx={{
      p: 2, borderRadius: 2.5,
      border: '1.5px solid #e2e8f0',
      backgroundColor: '#f8fafc',
      height: '100%',
    }}>
      <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mb: 0.8 }}>
        <Box sx={{ color: accent, display: 'flex' }}>{icon}</Box>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {label}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{value}</Typography>
    </Paper>
  );
}

export default function Provider() {
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
            Providers
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Manage your organization's healthcare providers&nbsp;
            <Typography component="span" variant="body2" sx={{ color: '#94a3b8' }}>
              ({PROVIDERS.length} total)
            </Typography>
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: 13,
            borderColor: '#e2e8f0', color: '#475569',
            '&:hover': { borderColor: '#94a3b8', bgcolor: '#f1f5f9' },
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                {['Provider Name', 'NPI Number', 'Tax ID', 'Type', 'Status', 'Actions'].map((h) => (
                  <TableCell key={h} sx={{
                    fontSize: 11.5, fontWeight: 700, color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: 0.6,
                    borderBottom: '1.5px solid #e2e8f0', py: 1.5, px: 2.5,
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {PROVIDERS.map((p) => (
                <TableRow key={p.id} sx={{
                  '&:hover': { bgcolor: '#f8fafc' },
                  '&:last-child td': { border: 0 },
                  transition: 'background 0.15s',
                }}>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: '#e8f0fe', color: '#4a6cf7' }}>
                        <PersonRoundedIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{p.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <Box sx={{ display: 'inline-block', px: 1.5, py: 0.4, backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: 13, fontWeight: 500, color: '#475569' }}>
                      {p.npi}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <Box sx={{ display: 'inline-block', px: 1.5, py: 0.4, backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: 13, fontWeight: 500, color: '#475569' }}>
                      {p.taxId}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: TYPE_COLOR[p.type] ?? '#475569' }}>
                      {p.type}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <StatusChip status={p.status} />
                  </TableCell>
                  <TableCell sx={{ py: 2.2, px: 2.5 }}>
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={() => setSelected(p)} sx={{
                        color: '#94a3b8',
                        '&:hover': { color: '#6366f1', bgcolor: '#f0f4ff' },
                      }}>
                        <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ px: 3, py: 1.8, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Showing {PROVIDERS.length} of {PROVIDERS.length} providers
          </Typography>
        </Box>
      </Paper>

      {/* Provider Details Modal */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
      >
        {selected && (
          <>
            {/* Modal gradient header */}
            <Box sx={{
              background: 'linear-gradient(135deg, #4a6cf7 0%, #7c3aed 100%)',
              px: 3.5, py: 2.5,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>
                Provider Details
              </Typography>
              <IconButton onClick={() => setSelected(null)} size="small" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3.5, backgroundColor: '#f8fafc' }}>

              {/* Provider identity card */}
              <Paper elevation={0} sx={{
                p: 2.5, mb: 3, borderRadius: 3,
                border: '1.5px solid #e2e8f0',
                background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)',
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '14px',
                  background: 'linear-gradient(135deg, #e8f0fe, #ede9fe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MedicalServicesRoundedIcon sx={{ fontSize: 26, color: '#4a6cf7' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0f172a', mb: 0.8 }}>
                    {selected.name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <StatusChip status={selected.status} />
                    <Chip label={selected.type} size="small" sx={{
                      backgroundColor: '#ede9fe', color: TYPE_COLOR[selected.type],
                      fontWeight: 600, fontSize: 12, borderRadius: '999px',
                      border: '1px solid #ddd6fe',
                    }} />
                  </Stack>
                </Box>
              </Paper>

              {/* Info fields grid */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    icon={<FingerprintRoundedIcon sx={{ fontSize: 15 }} />}
                    label="NPI Number"
                    value={selected.npi}
                    accent="#4a6cf7"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    icon={<AccountBalanceRoundedIcon sx={{ fontSize: 15 }} />}
                    label="Tax ID"
                    value={selected.taxId}
                    accent="#7c3aed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    icon={<BadgeRoundedIcon sx={{ fontSize: 15 }} />}
                    label="Tax ID Type"
                    value={selected.taxIdType}
                    accent="#0891b2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    icon={<HealthAndSafetyRoundedIcon sx={{ fontSize: 15 }} />}
                    label="NPI Status"
                    value={selected.npiStatus}
                    accent="#16a34a"
                  />
                </Grid>
              </Grid>

              {/* Taxonomies */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: '8px',
                    background: 'linear-gradient(135deg, #e8f0fe, #ede9fe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MedicalServicesRoundedIcon sx={{ fontSize: 15, color: '#4a6cf7' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Taxonomies</Typography>
                </Stack>

                {selected.taxonomies.map((t, i) => (
                  <Paper key={i} elevation={0} sx={{
                    p: 2.5, borderRadius: 2.5,
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 0.3 }}>
                        {t.specialty}
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: '#94a3b8', fontFamily: 'monospace' }}>
                        {t.code}
                      </Typography>
                    </Box>
                    {t.primary && (
                      <Chip label="Primary" size="small" sx={{
                        backgroundColor: '#e8f0fe', color: '#4a6cf7',
                        fontWeight: 600, fontSize: 11, borderRadius: '999px',
                        border: '1px solid #c7d7f8',
                      }} />
                    )}
                  </Paper>
                ))}
              </Box>

            </DialogContent>

            <DialogActions sx={{ px: 3.5, py: 2, backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <Button
                onClick={() => setSelected(null)}
                variant="outlined"
                sx={{
                  borderRadius: 2.5, textTransform: 'none', fontWeight: 600,
                  borderColor: '#e2e8f0', color: '#475569', px: 3,
                  '&:hover': { borderColor: '#94a3b8', bgcolor: '#f1f5f9' },
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2.5, textTransform: 'none', fontWeight: 700, px: 3,
                  background: 'linear-gradient(135deg, #4a6cf7, #7c3aed)',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                  '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.45)' },
                }}
              >
                Re-verify Eligibility
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
}
