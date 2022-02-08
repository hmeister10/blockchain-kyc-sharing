import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
import Logo from '../components/Logo';
//
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {
  const { user } = useMoralis();
  const location = useLocation();

  if (user) {
    if (!user.get('firstName')) {
      if (location.pathname !== '/register') {
        // firstname isnt saved yet && user is not on register page
        return <Navigate to="/register" state={{ from: location }} replace />;
      }
    } else {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  }

  return (
    <HeaderStyle>
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
