import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
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
      textShadow: '2px 2px #000000',
      textAlign: 'center',
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: '1.5',
      letterSpacing: '0.03em',
    },
  },
});

export default function HomePage() {
  const title = 'Bienvenue sur la page du BDE';
  const infoText =
    "Je vais vous expliquer comment utiliser le site (jugez pas le front ici on fait du back hein).";
  const infoText2 =
    "Premièrement vous avez la Navbar en haut avec différents onglets.";
  const infoText3 =
    "Admin qui sera uniquement pour Fab et moi, documents pour déposer des factures ou des documents importants sur un cloud et inventaire pour voir l'inventaire du BDE.";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage:
            'url(https://media.discordapp.net/attachments/1024581903132672030/1089593298387210361/IMG_0758.jpg?width=1193&height=671)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingY: 10,
        }}
      >
        <Typography variant="h4" color="primary.contrastText" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: 5,
            boxShadow:
              '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
        >
          <Typography variant="body1" gutterBottom>
            {infoText}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {infoText2}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {infoText3}
          </Typography>
          <Box mt={4}>
            <Button
              href="mailto:kevin1.glaentzlin@epitech.eu"
              variant="contained"
              color="secondary"
              sx={{ marginRight: 2 }}
            >
              Contact
            </Button>
            <Button
              href="https://example.com/report-bugs"
              variant="contained"
              color="primary"
            >
              Report Bugs
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
