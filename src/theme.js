// import { createTheme, alpha } from '@mui/material';

// const BRAND = {
//   primary:   '#6366f1',
//   secondary: '#8b5cf6',
//   success:   '#16a34a',
//   warning:   '#d97706',
//   error:     '#dc2626',
//   info:      '#0891b2',
// };

// export function createAppTheme(mode) {
//   const isDark = mode === 'dark';

//   return createTheme({
//     palette: {
//       mode,
//       primary:   { main: BRAND.primary,   light: '#818cf8', dark: '#4338ca', contrastText: '#fff' },
//       secondary: { main: BRAND.secondary, light: '#a78bfa', dark: '#6d28d9', contrastText: '#fff' },
//       success:   { main: BRAND.success,   light: '#4ade80', dark: '#15803d', contrastText: '#fff' },
//       warning:   { main: BRAND.warning,   light: '#fbbf24', dark: '#b45309', contrastText: '#fff' },
//       error:     { main: BRAND.error,     light: '#f87171', dark: '#b91c1c', contrastText: '#fff' },
//       info:      { main: BRAND.info,      light: '#38bdf8', dark: '#0e7490', contrastText: '#fff' },
//       background: {
//         default: isDark ? '#0d1117' : '#f8fafc',
//         paper:   isDark ? '#161b27' : '#ffffff',
//       },
//       text: {
//         primary:   isDark ? '#f1f5f9' : '#0f172a',
//         secondary: isDark ? '#94a3b8' : '#64748b',
//         disabled:  isDark ? '#475569' : '#94a3b8',
//       },
//       divider: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
//     },

//     typography: {
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500, fontWeightBold: 700,
//       h1: { fontSize: '2.25rem',  fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2  },
//       h2: { fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.02em',  lineHeight: 1.25 },
//       h3: { fontSize: '1.5rem',   fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.3  },
//       h4: { fontSize: '1.25rem',  fontWeight: 700, letterSpacing: '-0.01em',  lineHeight: 1.35 },
//       h5: { fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em',  lineHeight: 1.4  },
//       h6: { fontSize: '1rem',     fontWeight: 700, letterSpacing: '-0.005em', lineHeight: 1.4  },
//       body1:   { fontSize: '0.9375rem', lineHeight: 1.6 },
//       body2:   { fontSize: '0.875rem',  lineHeight: 1.6 },
//       caption: { fontSize: '0.75rem',   lineHeight: 1.5 },
//       button:  { fontSize: '0.875rem',  fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
//     },

//     shape: { borderRadius: 10 },

//     components: {
//       MuiCssBaseline: {
//         styleOverrides: {
//           '*': { boxSizing: 'border-box' },
//           body: {
//             backgroundColor: isDark ? '#0d1117' : '#f8fafc',
//             color: isDark ? '#f1f5f9' : '#0f172a',
//             transition: 'background-color 0.3s ease, color 0.3s ease',
//           },
//           '::-webkit-scrollbar': { width: 6, height: 6 },
//           '::-webkit-scrollbar-track': { background: 'transparent' },
//           '::-webkit-scrollbar-thumb': { background: isDark ? '#334155' : '#cbd5e1', borderRadius: 99 },
//           '::-webkit-scrollbar-thumb:hover': { background: isDark ? '#475569' : '#94a3b8' },
//         },
//       },

//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             backgroundImage: 'none',
//             borderRadius: 12,
//             transition: 'background-color 0.3s ease, box-shadow 0.2s ease',
//             ...(isDark && {
//               backgroundColor: '#161b27',
//               border: '1px solid rgba(255,255,255,0.07)',
//             }),
//           },
//         },
//       },

//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: 'none', fontWeight: 600, borderRadius: 10,
//             transition: 'all 0.2s ease',
//             '&:hover': { transform: 'translateY(-1px)' },
//             '&:active': { transform: 'translateY(0)' },
//           },
//           contained: {
//             boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
//             '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.45)' },
//           },
//           outlined: {
//             borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
//             '&:hover': { borderColor: BRAND.primary, backgroundColor: alpha(BRAND.primary, 0.08) },
//           },
//         },
//       },

//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             fontWeight: 700, fontSize: '0.6875rem',
//             textTransform: 'uppercase', letterSpacing: '0.06em',
//             color: isDark ? '#64748b' : '#94a3b8',
//             backgroundColor: isDark ? '#1e2433' : '#f8fafc',
//             borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid #e2e8f0',
//           },
//           body: {
//             fontSize: '0.875rem',
//             color: isDark ? '#cbd5e1' : '#374151',
//             borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f1f5f9',
//           },
//         },
//       },

//       MuiTableRow: {
//         styleOverrides: {
//           root: {
//             transition: 'background-color 0.15s',
//             '&:hover': { backgroundColor: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.03)' },
//             '&:last-child td': { borderBottom: 0 },
//           },
//         },
//       },

//       MuiDivider: {
//         styleOverrides: {
//           root: { borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0' },
//         },
//       },

//       MuiTooltip: {
//         styleOverrides: {
//           tooltip: {
//             backgroundColor: isDark ? '#1e2433' : '#0f172a',
//             fontSize: '0.75rem', fontWeight: 500, borderRadius: 8, padding: '6px 10px',
//             border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
//           },
//           arrow: { color: isDark ? '#1e2433' : '#0f172a' },
//         },
//       },

//       MuiDialog: {
//         styleOverrides: {
//           paper: {
//             borderRadius: 16,
//             boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.5)' : '0 24px 64px rgba(0,0,0,0.15)',
//             ...(isDark && { backgroundColor: '#161b27', border: '1px solid rgba(255,255,255,0.08)' }),
//           },
//         },
//       },

//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             '& .MuiOutlinedInput-root': {
//               borderRadius: 10,
//               backgroundColor: isDark ? '#1e2433' : '#f8fafc',
//               transition: 'background-color 0.2s',
//               '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' },
//               '&:hover fieldset': { borderColor: BRAND.primary },
//               '&.Mui-focused fieldset': { borderColor: BRAND.primary, borderWidth: 2 },
//               '&.Mui-focused': { backgroundColor: isDark ? '#252d3d' : '#ffffff' },
//               '& input': { color: isDark ? '#f1f5f9' : '#0f172a' },
//               '& input::placeholder': { color: isDark ? '#475569' : '#94a3b8' },
//             },
//           },
//         },
//       },

//       MuiSelect: {
//         styleOverrides: {
//           root: {
//             borderRadius: 10,
//             backgroundColor: isDark ? '#1e2433' : '#ffffff',
//             color: isDark ? '#f1f5f9' : '#0f172a',
//             '& .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' },
//             '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: BRAND.primary },
//           },
//         },
//       },

//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             ...(isDark && {
//               '&:hover': { backgroundColor: 'rgba(99,102,241,0.12)' },
//               '&.Mui-selected': { backgroundColor: 'rgba(99,102,241,0.2)' },
//             }),
//           },
//         },
//       },

//       MuiChip: {
//         styleOverrides: {
//           root: { borderRadius: 8, fontWeight: 600, fontSize: '0.75rem' },
//         },
//       },

//       MuiIconButton: {
//         styleOverrides: {
//           root: {
//             transition: 'all 0.2s ease',
//             '&:hover': { backgroundColor: alpha(BRAND.primary, isDark ? 0.15 : 0.08) },
//           },
//         },
//       },

//       MuiListItemButton: {
//         styleOverrides: {
//           root: { borderRadius: 10, transition: 'all 0.2s ease' },
//         },
//       },
//     },
//   });
// }
