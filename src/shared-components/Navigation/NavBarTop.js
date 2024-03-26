import {
  Toolbar,
  Typography,
  AppBar,
  Box,
  Button,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
} from '@mui/material';
import { InputField } from '../form/InputField';
import { useCookies } from 'react-cookie';
import { Search } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import { showLoginModal } from '../modals/LoginModal';
import { NAVBAR_LEFT_WIDTH_PERCENT } from '../../app/Layout';
import { useNavigate } from 'react-router-dom';
import ComboLogo from '../../assets/ComboLogo.png';

const NavBarTop = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setAuthInfo, handleLogout } = useAuth();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
        backgroundColor: 'white',
        borderBottom: 1,
        borderColor: 'lightgray',
        height: '4rem',
        bgcolor: 'lightestBlue.main',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: '100%',
          paddingRight: 5,
        }}
      >
        <Button
          onClick={() => {
            navigate('/');
          }}
          sx={{
            padding: 1,
            margin: 0,
            height: '100%',
            width: `${NAVBAR_LEFT_WIDTH_PERCENT}%`,
          }}
        >
          <img
            src={ComboLogo}
            alt="ComBo Logo"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Button>
        <TextField
          id="search"
          placeholder="Search for an event..."
          variant="outlined"
          sx={{
            width: '25%',
            marginLeft: 1,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={() => {
                    alert('Now I will search your personal data lol');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {isLoggedIn ? (
          <Button
            variant="contained"
            title="Log Out"
            onClick={handleLogout}
            color="navBarButton"
            sx={{
              marginLeft: 'auto',
              border: '3px solid',
              borderColor: 'darkestBlue.main',
              borderRadius: 3,
            }}
          >
            Log Out
          </Button>
        ) : (
          <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto' }}>
            <Button
              variant="contained"
              title="Log In"
              color="navBarButton"
              sx={{
                border: '3px solid',
                borderColor: 'darkestBlue.main',
                borderRadius: 3,
              }}
              onClick={() => {
                showLoginModal({
                  onSubmit: (values) => setAuthInfo({ id: '123', ...values }),
                  initalFormShown: 'Login',
                });
              }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              title="Sign Up"
              color="navBarButton"
              sx={{
                border: '3px solid',
                borderColor: 'darkestBlue.main',
                borderRadius: 3,
              }}
              onClick={() => {
                showLoginModal({
                  onSubmit: (values) => setAuthInfo({ id: '123', ...values }),
                  initalFormShown: 'Sign up',
                });
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBarTop;
