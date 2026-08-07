import React, { useState } from 'react';
import {
  Box, Typography, Paper, Stack, Chip, TextField,
  InputAdornment, Select, MenuItem, FormControl,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Checkbox, Tooltip, Divider, Grid,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const VISITS = [
  { id: 1,  patient: 'CHRISTINE TAMBORRA', dob: '07/10/1954', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'Aetna',               plan: 'MEDICARE (P01) ESA PPO PLAN', memberId: '102246421700', coverageStart: '01/01/2026', network: 'In-Network',  subscriberId: '102246421700', status: 'Active' },
  { id: 2,  patient: 'CHEYENNE LEEMAN',    dob: '03/19/1994', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'CIGNA',               plan: 'CIGNA PPO PLAN',              memberId: 'U5979751801',  coverageStart: '01/01/2026', network: 'In-Network',  subscriberId: 'U5979751801',  status: 'Inactive' },
  { id: 3,  patient: 'CHARLES MAGUIRE',    dob: '05/22/1958', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '1EG4TE5MK72',  coverageStart: '07/01/2022', network: 'In-Network',  subscriberId: '1EG4TE5MK72',  status: 'Inactive' },
  { id: 4,  patient: 'SCOTT DRESSER',      dob: '11/04/1969', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'Connecticare Medicare', plan: 'CONNECTICARE MEDICARE HMO', memberId: 'H9834521100',  coverageStart: '01/01/2026', network: 'Out-of-Network', subscriberId: 'H9834521100', status: 'Inactive' },
  { id: 5,  patient: 'WENDI ARNDT',        dob: '08/15/1972', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'Connecticare Medicare', plan: 'CONNECTICARE MEDICARE HMO', memberId: 'H2241785300',  coverageStart: '01/01/2025', network: 'Out-of-Network', subscriberId: 'H2241785300', status: 'Inactive' },
  { id: 6,  patient: 'SANDRA BURKE',       dob: '02/28/1960', visitDate: 'Jun 2, 2026',   visitType: 'FOLLOW UP', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '2TG9ER4MK89',  coverageStart: '03/01/2021', network: 'In-Network',  subscriberId: '2TG9ER4MK89',  status: 'Inactive' },
  { id: 7,  patient: 'ALBERTA LEO',        dob: '06/30/1955', visitDate: 'Jun 1, 2026',   visitType: 'FOLLOW UP', payer: 'Connecticare',        plan: 'CONNECTICARE PPO',            memberId: 'C4421985600',  coverageStart: '01/01/2026', network: 'In-Network',  subscriberId: 'C4421985600',  status: 'Inactive' },
  { id: 8,  patient: 'JUDITH BASTIEN',     dob: '04/12/1967', visitDate: 'Jun 1, 2026',   visitType: 'FOLLOW UP', payer: 'Connecticare',        plan: 'CONNECTICARE PPO',            memberId: 'C3312874500',  coverageStart: '01/01/2026', network: 'In-Network',  subscriberId: 'C3312874500',  status: 'Inactive' },
  { id: 9,  patient: 'MARGARET ANDERSON',  dob: '09/07/1953', visitDate: 'May 14, 2026',  visitType: 'FOLLOW UP', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '3HT7RE6NL91',  coverageStart: '01/01/2020', network: 'In-Network',  subscriberId: '3HT7RE6NL91',  status: 'Verification Failed' },
  { id: 10, patient: 'MARCIA KEELER',      dob: '01/18/1961', visitDate: 'May 14, 2026',  visitType: 'FOLLOW UP', payer: 'Medicare',            plan: 'MEDICARE PART B',             memberId: '4JK8SF7OM23',  coverageStart: '06/01/2019', network: 'In-Network',  subscriberId: '4JK8SF7OM23',  status: 'Verification Failed' },
];

const VISIT_TYPES = [...new Set(VISITS.map(v => v.visitType))];
const PAYERS      = [...new Set(VISITS.map(v => v.payer))];
const TOTAL = 627; const PAGE = 1; const PAGES = 63; const VERIFICATION_FAILURES = 177;

const SERVICE_BENEFITS = [
  {
    service: 'Urgent Care',
    subLabel: 'NON URGENT CARE BY PRIMARY CARE PHYSICIAN',
    networkNote: 'NETWORK NOT APPLICABLE',
    benefits: [
      { type: 'Co-Insurance', amount: '0%', messages: ['NON URGENT CARE BY PRIMARY CARE PHYSICIAN', 'URGENT CARE BY PRIMARY CARE PHYSICIAN', 'COINS APPLIES TO CATAS OUT OF POCKET'] },
      { type: 'Co-Payment',   amount: '$10.00', messages: ['NON URGENT CARE BY PRIMARY CARE PHYSICIAN', 'URGENT CARE BY PRIMARY CARE PHYSICIAN', 'COPAY INCLUDED IN CATAS OOP'] },
    ],
  },
  {
    service: 'Primary Care',
    subLabel: 'PROFESSIONAL SERVICES',
    networkNote: 'IN-NETWORK',
    benefits: [
      { type: 'Co-Payment',   amount: '$20.00', messages: ['PRIMARY CARE OFFICE VISIT', 'COPAY WAIVED IF ADMITTED'] },
      { type: 'Co-Insurance', amount: '10%',    messages: ['AFTER DEDUCTIBLE'] },
    ],
  },
  {
    service: 'Specialist',
    subLabel: 'SPECIALIST OFFICE VISIT',
    networkNote: 'IN-NETWORK',
    benefits: [
      { type: 'Co-Payment',   amount: '$40.00', messages: ['SPECIALIST OFFICE VISIT', 'REFERRAL REQUIRED'] },
    ],
  },
  {
    service: 'Emergency Room',
    subLabel: 'EMERGENCY CARE SERVICES',
    networkNote: 'NETWORK NOT APPLICABLE',
    benefits: [
      { type: 'Co-Payment',   amount: '$150.00', messages: ['EMERGENCY ROOM VISIT', 'WAIVED IF ADMITTED', 'APPLIES TO ALL FACILITIES'] },
      { type: 'Co-Insurance', amount: '20%',     messages: ['AFTER DEDUCTIBLE', 'APPLIES OUT-OF-NETWORK'] },
    ],
  },
  {
    service: 'Lab & Diagnostics',
    subLabel: 'LABORATORY SERVICES',
    networkNote: 'IN-NETWORK',
    benefits: [
      { type: 'Co-Insurance', amount: '0%', messages: ['ROUTINE LAB WORK', 'PREVENTIVE SERVICES COVERED 100%'] },
    ],
  },
  {
    service: 'Mental Health',
    subLabel: 'BEHAVIORAL HEALTH SERVICES',
    networkNote: 'IN-NETWORK',
    benefits: [
      { type: 'Co-Payment',   amount: '$20.00', messages: ['OUTPATIENT MENTAL HEALTH', 'SAME AS PRIMARY CARE'] },
      { type: 'Co-Insurance', amount: '10%',    messages: ['INPATIENT MENTAL HEALTH', 'AFTER DEDUCTIBLE'] },
    ],
  },
  {
    service: 'Chiropractic',
    subLabel: 'MANIPULATION MEDICARE STANDARD',
    networkNote: 'NETWORK NOT APPLICABLE',
    benefits: [
      { type: 'Co-Insurance', amount: '0%',    messages: ['MANIPULATION MEDICARE STANDARD', 'COINS APPLIES TO CATAS OUT OF POCKET'] },
      { type: 'Co-Payment',   amount: '$10.00', messages: ['MANIPULATION MEDICARE STANDARD', 'COPAY INCLUDED IN CATAS OOP'] },
    ],
  },
  {
    service: 'Hospital - Inpatient',
    subLabel: 'INTENSIVE CARE',
    networkNote: 'NETWORK NOT APPLICABLE',
    benefits: [
      { type: 'Co-Insurance', amount: '0%',     messages: ['INTENSIVE CARE UNIT', 'COINS APPLIES TO CATAS OUT OF POCKET'] },
      { type: 'Co-Payment',   amount: '$250.00', messages: ['INPATIENT HOSPITAL ADMISSION', 'COPAY WAIVED IF TRANSFERRED TO ICU'] },
    ],
  },
];

function CoverageChip({ status }) {
  if (status === 'Active') return (
    <Chip icon={<CheckCircleRoundedIcon style={{ fontSize: 13, color: '#16a34a' }} />} label="Active" size="small"
      sx={{ backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: 12, borderRadius: '999px', '& .MuiChip-icon': { ml: '6px' } }} />
  );
  if (status === 'Inactive') return (
    <Chip icon={<CancelRoundedIcon style={{ fontSize: 13, color: '#dc2626' }} />} label="Inactive" size="small"
      sx={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', fontWeight: 600, fontSize: 12, borderRadius: '999px', '& .MuiChip-icon': { ml: '6px' } }} />
  );
  return (
    <Chip icon={<ErrorOutlineRoundedIcon style={{ fontSize: 13, color: '#b45309' }} />} label="Verification Failed" size="small"
      sx={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontWeight: 600, fontSize: 11, borderRadius: '999px', '& .MuiChip-icon': { ml: '6px' } }} />
  );
}

function InfoRow({ label, value, bold }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 0.8 }}>
      <Typography sx={{ fontSize: 13, color: '#64748b', minWidth: 110 }}>{label}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: bold ? 700 : 500, color: '#0f172a', textAlign: 'right' }}>{value}</Typography>
    </Box>
  );
}

export default function PreviousVisits() {
  const [search, setSearch]               = useState('');
  const [visitTypeFilter, setVisitType]   = useState('all');
  const [payerFilter, setPayer]           = useState('all');
  const [verFailOnly, setVerFailOnly]     = useState(false);
  const [selectedRows, setSelectedRows]   = useState([]);
  const [detailVisit, setDetailVisit]     = useState(null);
  const [expandedServices, setExpandedServices] = useState({ 'Urgent Care': true });

  const toggleService = (name) => setExpandedServices(prev => ({ ...prev, [name]: !prev[name] }));
  const expandAll  = () => { const s = {}; SERVICE_BENEFITS.forEach(b => { s[b.service] = true; }); setExpandedServices(s); };
  const collapseAll = () => setExpandedServices({});

  const now = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const filtered = VISITS.filter(v => {
    const term = search.toLowerCase();
    return (v.patient.toLowerCase().includes(term) || v.payer.toLowerCase().includes(term) || v.subscriberId.toLowerCase().includes(term)) &&
      (visitTypeFilter === 'all' || v.visitType === visitTypeFilter) &&
      (payerFilter === 'all' || v.payer === payerFilter) &&
      (!verFailOnly || v.status === 'Verification Failed');
  });

  const allChecked = selectedRows.length === filtered.length && filtered.length > 0;
  const toggleAll  = () => setSelectedRows(allChecked ? [] : filtered.map(v => v.id));
  const toggleOne  = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  /* ── Detail View ── */
  if (detailVisit) {
    const v = detailVisit;
    const isActive = v.status === 'Active';
    return (
        <Box sx={{ flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* Coverage banner */}
        <Box sx={{
          px: 4, py: 2,
          backgroundColor: isActive ? '#f0fdf4' : '#fef2f2',
          borderBottom: `2px solid ${isActive ? '#bbf7d0' : '#fecaca'}`,
        }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
            <CheckCircleRoundedIcon sx={{ fontSize: 22, color: isActive ? '#16a34a' : '#dc2626' }} />
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: isActive ? '#15803d' : '#dc2626' }}>
              {isActive ? 'Active Coverage' : v.status}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Typography sx={{ fontSize: 13, color: '#374151' }}>
              Plan: <strong>{v.plan}</strong>
            </Typography>
            <Typography sx={{ color: '#94a3b8' }}>•</Typography>
            <Typography sx={{ fontSize: 13, color: '#374151' }}>
              Network: <strong>{v.network}</strong>
            </Typography>
            <Typography sx={{ color: '#94a3b8' }}>•</Typography>
            <Typography sx={{ fontSize: 13, color: '#374151' }}>
              Visit Date: <strong>{v.visitDate}</strong>
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: '#64748b', mt: 0.3 }}>
            Last checked: {v.visitDate.replace('Jun', '06').replace('May', '05').replace(', ', '/').replace(' ', '/')} 20:04 via Office Ally
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* Back button */}
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => setDetailVisit(null)}
            sx={{
              mb: 3, textTransform: 'none', fontWeight: 600, fontSize: 13,
              color: '#475569', borderRadius: 2.5,
              border: '1.5px solid #e2e8f0', px: 2, bgcolor: '#fff',
              '&:hover': { borderColor: '#6366f1', color: '#6366f1', bgcolor: '#f0f4ff' },
            }}
          >
            Back to Search
          </Button>

          <Grid container spacing={3}>
            {/* Left: Patient & Plan */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
                <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Patient & Plan</Typography>
                </Box>

                {/* Patient Info */}
                <Box sx={{ px: 3, py: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <PersonRoundedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                      Patient Information
                    </Typography>
                  </Stack>
                  <InfoRow label="Name:" value={v.patient} bold />
                  <InfoRow label="DOB:" value={v.dob} bold />
                </Box>

                <Divider />

                {/* Insurance Plan */}
                <Box sx={{ px: 3, py: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <LocalHospitalRoundedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                      Insurance Plan
                    </Typography>
                  </Stack>
                  <InfoRow label="Payer:" value={v.payer} bold />
                  <InfoRow label="Plan:" value={v.plan} bold />
                  <InfoRow label="Member ID:" value={v.memberId} bold />
                  <InfoRow label="Coverage Start:" value={v.coverageStart} bold />
                </Box>

                <Divider />

                {/* Provider Details */}
                <Box sx={{ px: 3, py: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <LocalHospitalRoundedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                      Provider Details
                    </Typography>
                  </Stack>
                  <InfoRow label="Visit Type:" value={v.visitType} bold />
                  <InfoRow label="Visit Date:" value={v.visitDate} bold />
                  <InfoRow label="Network:" value={v.network} bold />
                </Box>
              </Paper>
            </Grid>

            {/* Right: Summary */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden', height: '100%' }}>
                {/* Tab bar */}
                <Box sx={{ px: 3, borderBottom: '1px solid #e2e8f0' }}>
                  <Box sx={{
                    display: 'inline-block', py: 1.8,
                    borderBottom: '2px solid #4a6cf7',
                    fontSize: 14, fontWeight: 700, color: '#4a6cf7',
                  }}>
                    Summary
                  </Box>
                </Box>

                {/* Summary scrollable content */}
                <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 260px)', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>

                  {/* Patient Estimates */}
                  <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #e2e8f0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>Patient Estimates</Typography>

                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #e8f0fe, #ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AttachMoneyRoundedIcon sx={{ fontSize: 18, color: '#4a6cf7' }} />
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Patient Responsibility</Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                      <AttachMoneyRoundedIcon sx={{ fontSize: 44, color: '#e2e8f0', mb: 1 }} />
                      <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>No patient share calculation for this procedure code</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={1.5}>
                      {[{ label: 'Deductible', value: '—' }, { label: 'Out-of-Pocket Max', value: '—' }, { label: 'Copay', value: '—' }, { label: 'Coinsurance', value: '—' }].map(item => (
                        <Grid item xs={6} key={item.label}>
                          <Paper elevation={0} sx={{ p: 1.8, borderRadius: 2, border: '1.5px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                            <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6, mb: 0.4 }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{item.value}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Service Benefits & Copays */}
                  <Box sx={{ px: 3, py: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Service Benefits & Copays</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.3 }}>{SERVICE_BENEFITS.length} services with benefit details</Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={expandAll} sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, color: '#4a6cf7', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>Expand All</Button>
                        <Button size="small" onClick={collapseAll} sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, color: '#475569', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>Collapse All</Button>
                      </Stack>
                    </Box>

                    <Stack spacing={1.5}>
                      {SERVICE_BENEFITS.map(svc => {
                        const isOpen = !!expandedServices[svc.service];
                        return (
                          <Paper key={svc.service} elevation={0} sx={{ borderRadius: 2.5, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
                            {/* Service header */}
                            <Box onClick={() => toggleService(svc.service)} sx={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              px: 2.5, py: 1.8, cursor: 'pointer', bgcolor: '#fff',
                              '&:hover': { bgcolor: '#f8fafc' },
                            }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#16a34a', flexShrink: 0 }} />
                                <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{svc.service}</Typography>
                              </Stack>
                              {isOpen ? <ExpandLessRoundedIcon sx={{ fontSize: 20, color: '#94a3b8' }} /> : <ExpandMoreRoundedIcon sx={{ fontSize: 20, color: '#94a3b8' }} />}
                            </Box>

                            {/* Expanded content */}
                            {isOpen && (
                              <Box sx={{ px: 2.5, pb: 2, bgcolor: '#fafbff', borderTop: '1px solid #f1f5f9' }}>
                                <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.6, pt: 1.5, pb: 1 }}>
                                  {svc.subLabel}
                                </Typography>

                                {/* Network note */}
                                <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mb: 1.5 }}>
                                  <InfoOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
                                  <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    {svc.networkNote}
                                  </Typography>
                                </Stack>

                                {/* Benefit table */}
                                <Box sx={{ borderRadius: 2, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                  {/* Table header */}
                                  <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 2.5fr', bgcolor: '#f8fafc', px: 2, py: 1, borderBottom: '1px solid #e2e8f0' }}>
                                    {['BENEFIT TYPE', 'AMOUNT', 'MESSAGES'].map(h => (
                                      <Typography key={h} sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.6 }}>{h}</Typography>
                                    ))}
                                  </Box>
                                  {/* Rows */}
                                  {svc.benefits.map((b, bi) => (
                                    <Box key={bi} sx={{
                                      display: 'grid', gridTemplateColumns: '1.4fr 1fr 2.5fr',
                                      px: 2, py: 1.5, alignItems: 'flex-start',
                                      borderBottom: bi < svc.benefits.length - 1 ? '1px solid #f1f5f9' : 'none',
                                      bgcolor: bi % 2 === 1 ? '#f8faff' : '#fff',
                                    }}>
                                      <Typography sx={{ fontSize: 13, color: '#374151' }}>{b.type}</Typography>
                                      <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{b.amount}</Typography>
                                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                        {b.messages.map((msg, mi) => (
                                          <Typography key={mi} component="li" sx={{ fontSize: 12, color: '#475569', mb: 0.3 }}>{msg}</Typography>
                                        ))}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Paper>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  /* ── List View ── */
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1, backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>Previous Visits</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>View appointments from today and earlier</Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button variant="outlined" startIcon={<RefreshRoundedIcon />} sx={{
            borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: 13,
            borderColor: '#e2e8f0', color: '#475569',
            '&:hover': { borderColor: '#94a3b8', bgcolor: '#f1f5f9' },
          }}>Refresh</Button>
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <AccessTimeRoundedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8', whiteSpace: 'nowrap' }}>Last updated: {now}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Search */}
      <TextField fullWidth placeholder="Search by patient name, payer, or subscriber ID..."
        value={search} onChange={e => setSearch(e.target.value)} size="small"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5, bgcolor: '#fff', fontSize: 13.5,
            '& fieldset': { borderColor: '#e2e8f0' },
            '&:hover fieldset': { borderColor: '#6366f1' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
        }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment> }}
      />

      {/* Filters */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
        <Stack direction="row" alignItems="center" spacing={0.6}>
          <FilterListRoundedIcon sx={{ fontSize: 16, color: '#6366f1' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Filters:</Typography>
        </Stack>
        <FormControl size="small">
          <Select value={visitTypeFilter} onChange={e => setVisitType(e.target.value)}
            sx={{ borderRadius: 2, fontSize: 13, bgcolor: '#fff', minWidth: 150, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
            <MenuItem value="all">All Visit Types</MenuItem>
            {VISIT_TYPES.map(t => <MenuItem key={t} value={t} sx={{ fontSize: 13 }}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small">
          <Select value={payerFilter} onChange={e => setPayer(e.target.value)}
            sx={{ borderRadius: 2, fontSize: 13, bgcolor: '#fff', minWidth: 140, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' } }}>
            <MenuItem value="all">All Payers</MenuItem>
            {PAYERS.map(p => <MenuItem key={p} value={p} sx={{ fontSize: 13 }}>{p}</MenuItem>)}
          </Select>
        </FormControl>
        <Box onClick={() => setVerFailOnly(v => !v)} sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          border: `1.5px solid ${verFailOnly ? '#f97316' : '#e2e8f0'}`,
          borderRadius: 2, px: 1.5, py: 0.6, cursor: 'pointer',
          bgcolor: verFailOnly ? '#fff7ed' : '#fff', transition: 'all 0.15s',
          '&:hover': { borderColor: '#f97316', bgcolor: '#fff7ed' },
        }}>
          <ErrorOutlineRoundedIcon sx={{ fontSize: 15, color: '#f97316' }} />
          <Typography sx={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Verification Failures Only</Typography>
          <Box sx={{ ml: 0.5, px: 1, py: 0.1, borderRadius: '999px', backgroundColor: '#f97316', color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: '18px' }}>
            {VERIFICATION_FAILURES}
          </Box>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          border: '1.5px solid #e2e8f0', borderRadius: 2,
          px: 1.5, py: 0.6, bgcolor: '#fff', cursor: 'pointer',
          '&:hover': { borderColor: '#6366f1' },
        }}>
          <CalendarTodayRoundedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
          <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>Date range – Date range</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', ml: 'auto', whiteSpace: 'nowrap' }}>
          Page {PAGE} of {PAGES} ({TOTAL} total)
        </Typography>
      </Stack>

      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 1.4, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Checkbox size="small" checked={allChecked} indeterminate={selectedRows.length > 0 && !allChecked} onChange={toggleAll}
            sx={{ p: 0.3, color: '#cbd5e1', '&.Mui-checked': { color: '#6366f1' }, '&.MuiCheckbox-indeterminate': { color: '#6366f1' } }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{filtered.length} appointments</Typography>
        </Box>

        {/* Table with horizontal scroll */}
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell padding="checkbox" sx={{ borderBottom: '1.5px solid #e2e8f0', pl: 2.5 }} />
                {['Patient Name', 'DOB', 'Visit Date', 'Visit Type', 'Insurance/Payer', 'Subscriber ID', 'Coverage Status', 'Details'].map(h => (
                  <TableCell key={h} sx={{
                    fontSize: 11, fontWeight: 700, color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: 0.6,
                    borderBottom: '1.5px solid #e2e8f0', py: 1.4, px: 2, whiteSpace: 'nowrap',
                  }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} sx={{ textAlign: 'center', py: 6, color: '#94a3b8', fontSize: 14 }}>
                    No records match your search or filters.
                  </TableCell>
                </TableRow>
              ) : filtered.map((v, i) => {
                const isChecked = selectedRows.includes(v.id);
                return (
                  <TableRow key={v.id} sx={{
                    bgcolor: isChecked ? 'rgba(99,102,241,0.03)' : i % 2 === 0 ? '#fff' : '#fafbff',
                    '&:hover': { bgcolor: 'rgba(99,102,241,0.04)' },
                    '&:last-child td': { border: 0 },
                    transition: 'background 0.12s',
                  }}>
                    <TableCell padding="checkbox" sx={{ pl: 2.5 }}>
                      <Checkbox size="small" checked={isChecked} onChange={() => toggleOne(v.id)}
                        sx={{ p: 0.3, color: '#cbd5e1', '&.Mui-checked': { color: '#6366f1' } }} />
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2 }}>
                      <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{v.patient}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2, fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{v.dob}</TableCell>
                    <TableCell sx={{ py: 2, px: 2, fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{v.visitDate}</TableCell>
                    <TableCell sx={{ py: 2, px: 2 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: 0.3 }}>
                        {v.visitType}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2, fontSize: 13, color: '#374151' }}>{v.payer}</TableCell>
                    <TableCell sx={{ py: 2, px: 2 }}>
                      <Box sx={{ display: 'inline-block', px: 1.5, py: 0.3, backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: 12.5, fontWeight: 500, color: '#475569', fontFamily: 'monospace' }}>
                        {v.subscriberId}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2 }}><CoverageChip status={v.status} /></TableCell>
                    <TableCell sx={{ py: 2, px: 2 }}>
                      <Tooltip title="View Details">
                        <Button size="small" startIcon={<VisibilityRoundedIcon sx={{ fontSize: 15 }} />}
                          onClick={() => setDetailVisit(v)}
                          sx={{
                            textTransform: 'none', fontWeight: 600, fontSize: 13,
                            color: '#475569', borderRadius: 2,
                            border: '1px solid #e2e8f0', px: 1.5, py: 0.4, bgcolor: '#fff',
                            '&:hover': { color: '#6366f1', borderColor: '#6366f1', bgcolor: '#f0f4ff' },
                          }}>
                          View
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ px: 3, py: 1.8, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>Showing {filtered.length} of {VISITS.length} records</Typography>
          <Stack direction="row" spacing={0.8}>
            {[
              { label: 'Active', bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
              { label: 'Inactive', bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
              { label: 'Verification Failed', bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
            ].map(s => (
              <Chip key={s.label} label={`${s.label}: ${VISITS.filter(v => v.status === s.label).length}`} size="small"
                sx={{ bgcolor: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
