import * as React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './chart';
import Deposits from './deposits';
import Orders from './orders';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ethers } from 'ethers';

import donationAbi from './abi/Donation.json';

function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.unicef.org">  
      www.unicef.org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, dashboard }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(dashboard && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, dashboard }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!dashboard && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme(
  {
      palette: {
          mode: "dark",
      primary: {
          main: green[500],
      },
      secondary: {
          main: green[500]
}
}}
);

export default function Dashboard({ paymentType }) {

  const [dashboard, setDashboard] = useState(true);

  const toggleDrawer = () => {
    setDashboard(!dashboard);
  };

  const { open } = useWeb3Modal()

  
  const claim = async () => {
      if (window.ethereum) {
        const result = await window.ethereum.request({ method: 'eth_accounts' });
        if(result.length > 0) {
          const ethersProvider =  new ethers.BrowserProvider(window.ethereum)
          const currentSigner = await ethersProvider.getSigner()
          const contract = new ethers.Contract("0x1fA99bB28cc817aAc2B5D35bE56c0121DAdC8E0F", donationAbi["abi"], currentSigner);
          try {
            const tx = await contract.claimUnicefCoins()
            // const totalTokens = await contract.unitokenBalance()
            // console.log(totalTokens)
            const receipt = await ethersProvider.waitForTransaction(tx.hash);
            if (receipt.status === 1) {
              console.log('Transaction was successful');
              const totalTokens = await contract.unitokenBalance()
              console.log(totalTokens)
              // switcher(prop, "Success")
            } else {
              // switcher(prop, "Failed")
              console.log('Transaction failed');
            }       
            } catch (error) {
            console.log(error)
          }
        } else {
            alert("Please connect your wallet")
        }
      }
    }
    

    
    return (
      <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" dashboard={dashboard}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(dashboard && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Button color="inherit" onClick={ () => claim() }>Claim UNICEF Tokens </Button>
            {paymentType === "undefined" && <Button color="inherit" onClick={ () => open() }>Connect wallet </Button>}
            <Button color="inherit" component={NavLink} to="/logout">Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" dashboard={dashboard}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
