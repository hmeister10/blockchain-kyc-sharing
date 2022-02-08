import { useLocation, Navigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Button, Container, Typography } from '@mui/material';

// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { authenticate, user } = useMoralis();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to KYC Sample App
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Note: You metamask wallet address will be stored in a Moralis Database. However, we do
              not use this for anything. This is just a dummy application to show how the KYC flow
              works
            </Typography>
            <Button sx={{ mt: 5 }} variant="contained" onClick={() => authenticate()}>
              Authenticate with Metamask
            </Button>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
