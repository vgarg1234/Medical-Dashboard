import React, { useState } from 'react';
import { Box, Drawer, IconButton, AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 260;

export default function Layout({ activePage, onNavigate, onLogout, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>

      {/* ── Mobile Top AppBar ── */}
      {isMobile && (
        <AppBar position="fixed" elevation={0} sx={{
          bgcolor: '#0f172a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: theme.zIndex.drawer + 1,
        }}>
          <Toolbar sx={{ minHeight: '56px !important', px: 2, gap: 1.5 }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)}
              sx={{ color: '#e2e8f0', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
              <MenuRoundedIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '8px', bgcolor: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                <Box component="img" src="/AppliteLogo.webp" alt=""
                  sx={{ width: 20, height: 20, objectFit: 'contain' }} />
              </Box>
              <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 0.2 }}>
                Applite
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* ── Desktop Sidebar (permanent) ── */}
      {!isMobile && (
        <Sidebar activePage={activePage} onNavigate={handleNavigate} onLogout={onLogout} />
      )}

      {/* ── Mobile Sidebar (drawer) ── */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
            },
          }}
        >
          <Sidebar activePage={activePage} onNavigate={handleNavigate} onLogout={onLogout} />
        </Drawer>
      )}

      {/* ── Main Content ── */}
      <Box component="main" sx={{
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
        mt: isMobile ? '56px' : 0,
        width: isMobile ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
        overflowX: 'hidden',
      }}>
        {children}
      </Box>

    </Box>
  );
}
