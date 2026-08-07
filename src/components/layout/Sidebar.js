import React from 'react';
import {
  Box, Typography, Avatar, List, ListItemButton,
  ListItemIcon, ListItemText, Divider,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const NAV_ITEMS = [
  { id: 'upcoming',      label: 'Upcoming Visits',       icon: <CalendarMonthIcon fontSize="small" /> },
  { id: 'previous',      label: 'Previous Visits',       icon: <HistoryIcon fontSize="small" /> },
  { id: 'coverage',      label: 'Patient Coverage',      icon: <ArticleIcon fontSize="small" /> },
  { id: 'dashboard',     label: 'Dashboard',             icon: <BarChartIcon fontSize="small" /> },
  { id: 'provider',      label: 'Providers',             icon: <MedicalServicesIcon fontSize="small" /> },
  { id: 'fee-schedule',  label: 'Provider Fee Schedule', icon: <AttachMoneyIcon fontSize="small" /> },
];

const now = new Date().toLocaleString('en-US', {
  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
});

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <Box sx={{
      width: 260, minWidth: 260, height: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1a2540 60%, #1e293b 100%)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0, zIndex: 100,
      boxShadow: '4px 0 32px rgba(0,0,0,0.25)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
    }}>

      {/* Logo */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2.5, py: 2.2,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: '12px', bgcolor: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
          boxShadow: '0 0 0 2px rgba(99,102,241,0.4), 0 4px 14px rgba(99,102,241,0.3)',
          transition: 'box-shadow 0.3s',
          '&:hover': { boxShadow: '0 0 0 3px rgba(99,102,241,0.6), 0 6px 20px rgba(99,102,241,0.4)' },
        }}>
          <Box component="img" src="/AppliteLogo.webp" alt="Applite"
            sx={{ width: 28, height: 28, objectFit: 'contain' }} />
        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: 0.2, lineHeight: 1 }}>
          Applite
        </Typography>
      </Box>

      {/* Org */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2.5, py: 1.6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        bgcolor: 'rgba(255,255,255,0.02)',
      }}>
        <Avatar sx={{
          width: 34, height: 34, borderRadius: '9px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          fontSize: 12, fontWeight: 800,
          boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
        }}>AH</Avatar>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>Applite Health</Typography>
      </Box>

      {/* User */}
      <Box sx={{
        px: 2.5, py: 1.6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{
              width: 32, height: 32,
              bgcolor: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#94a3b8',
            }}>
              <MedicalServicesIcon sx={{ fontSize: 15 }} />
            </Avatar>
            {/* Online dot */}
            <Box sx={{
              position: 'absolute', bottom: 0, right: 0,
              width: 9, height: 9, borderRadius: '50%',
              bgcolor: '#22c55e',
              border: '2px solid #0f172a',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.4 },
              },
              animation: 'pulse 2s infinite',
            }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3 }}>
              Vatsal Garg
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: '#475569', lineHeight: 1.3 }}>
              Front Desk · Applite Health
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.8, pl: 5.2 }}>
          <AccessTimeIcon sx={{ fontSize: 10, color: '#334155' }} />
          <Typography sx={{ fontSize: 10, color: '#334155' }}>Last login: {now}</Typography>
        </Box>
      </Box>

      {/* Nav label */}
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: 1.2, textTransform: 'uppercase', px: 2.5, pt: 2, pb: 0.5 }}>
        Navigation
      </Typography>

      {/* Nav Items */}
      <List sx={{
        flex: 1, px: 1.2, py: 0.5, overflowY: 'auto',
        '&::-webkit-scrollbar': { width: 3 },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.08)', borderRadius: 4 },
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <ListItemButton
              key={item.id}
              onClick={() => onNavigate(item.id)}
              sx={{
                borderRadius: '10px', mb: 0.4, px: 1.6, py: 1,
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.2s ease',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.28), rgba(139,92,246,0.18))'
                  : 'transparent',
                border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                boxShadow: isActive ? '0 2px 12px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
                '&:hover': {
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.25))'
                    : 'rgba(255,255,255,0.05)',
                  transform: 'translateX(3px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                },
                '&::before': isActive ? {
                  content: '""', position: 'absolute',
                  left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: 3, height: '55%',
                  background: 'linear-gradient(180deg, #818cf8, #a78bfa)',
                  borderRadius: '0 3px 3px 0',
                  boxShadow: '0 0 8px rgba(129,140,248,0.6)',
                } : {},
              }}
            >
              <ListItemIcon sx={{
                minWidth: 30,
                color: isActive ? '#a5b4fc' : '#475569',
                transition: 'color 0.2s',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#c7d2fe' : '#64748b',
                  transition: 'color 0.2s',
                }}
              />
              {isActive && (
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%',
                  bgcolor: '#818cf8',
                  boxShadow: '0 0 6px rgba(129,140,248,0.8)',
                  '@keyframes glow': {
                    '0%, 100%': { boxShadow: '0 0 6px rgba(129,140,248,0.8)' },
                    '50%': { boxShadow: '0 0 12px rgba(129,140,248,1)' },
                  },
                  animation: 'glow 1.5s infinite',
                }} />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* Logout */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
      <Box sx={{ px: 1.2, py: 1.2 }}>
        <ListItemButton onClick={onLogout} sx={{
          borderRadius: '10px', px: 1.6, py: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'rgba(239,68,68,0.12)',
            transform: 'translateX(3px)',
            border: '1px solid rgba(239,68,68,0.2)',
          },
          border: '1px solid transparent',
        }}>
          <ListItemIcon sx={{ minWidth: 30, color: '#ef4444' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}
          />
        </ListItemButton>
      </Box>

    </Box>
  );
}
