import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#42a5f5',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      letterSpacing: '0.03em',
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: '1.5',
      letterSpacing: '0.03em',
    },
  },
});
export default function HomePage() {
  const title = "Bienvenue sur la page du BDE";
  const infoText = "Je vais vous expliquer comment utiliser le site (jugez pas le front ici on fait du back hein).";
  const infoText2 = "Premièrement vous avez la Navbar en haut avec différents onglets.";
  const infoText3 = "Admin qui sera uniquement pour Fab et moi, documents pour déposer des factures ou des documents imortants sur un cloud et inventaire pour voir l'invetaire du BDE";

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          textAlign="center"
          paddingY={4}
          sx={{
            background: `linear - gradient(45deg, ${ theme.palette.primary.main } 30 %, ${ theme.palette.secondary.main } 90 %)`,
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
        >
          <Typography variant="h4" color="secondary.main" sx={{ marginBottom: '8rem' }}>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {infoText}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {infoText2}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {infoText3}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}