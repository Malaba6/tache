import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  Grid, Button, IconButton, Avatar, Menu, MenuItem,
  ListItem, ListItemIcon, ListItemText, List, Collapse,
} from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

import { useAuth } from '@context/useAuth'

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return <Grid
    container item xs={8}
    justifyContent='flex-end'>
    <IconButton
      aria-controls='user-menu'
      onClick={handleClick}
      aria-haspopup='true'>
        <Avatar>EM</Avatar>
    </IconButton>
    <Collapse in={Boolean(anchorEl)} timeout={2000}>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        onClick={handleClose}
        open={Boolean(anchorEl)}
        >
        <MenuItem>
          <ListItem>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </MenuItem>
      </Menu>
    </Collapse>
  </Grid>
}

const UserAuth = () => <Grid
  container item xs={8}
  justifyContent='flex-end'
  direction='row'>
  <Button
    color="inherit"
    variant='outlined'
    sx={{
      color: 'secondary.main',
      m: 1,
      '@media (max-width: 290px)': {
        m: 0,
        mr: 0.3,
      },
    }}>
      {'Signup'}
  </Button>
    <Button
      color="inherit"
      variant='outlined'
      // onClick={isConnBtnOn ? handleConnect : handleDisconnect}
      sx={{
        color: 'info.main',
        m: 1,
        '@media (max-width: 290px)': {
          m: 0,
        },
        position: 'relative',
        borderRadius: '5px',
        ':before': {
          content: '""',
          boxSizing: 'inherit',
          position: 'absolute',
          width: 0,
          height: 0,
          border: 'thin solid transparent',
          borderRadius: '5px',
          top: 0,
          left: 0,
        },
        ':after': {
          content: '""',
          boxSizing: 'inherit',
          position: 'absolute',
          width: 0,
          height: 0,
          border: 'thin solid transparent',
          borderRadius: '5px',
          bottom: 0,
          right: 0,
        },
        ':hover': {
          color: 'secondary.main'
        },
        ':hover:before': {
          width: '100%',
          height: '100%',
          borderTopColor: 'secondary.main',
          borderRightColor: 'secondary.main',
          borderRadius: '5px',
          transition: `width 0.5s ease-in-out, height 0.75s ease-in-out`,
        },
        ':hover:after': {
          width: '100%',
          height: '100%',
          borderBottomColor: 'secondary.main',
          borderLeftColor: 'secondary.main',
          borderRadius: '5px',
          transition: `border-color 0s ease-in-out 0.5s, width 0.25s ease-in-out 0.5s, height 0.25s ease-in-out 0.75s`,
        },
        transition: 'color 0.2s',
      }}>
        {'Login'}
    </Button>
</Grid>

export default function ButtonAppBar({
  wallet, network, account, isConnected,
  connectNetwork, disconnectNetwork, setMsg
}) {
  const theme = useTheme()
  const [ {isAuthenticated }, dispatch] = useAuth()

  const [loading, setLoading] = useState(false)
  const [isConnBtnOn, setIsConnBtnOn] = useState(true)

  const logoColors = theme.palette.mode === 'light'
    ? `0px 3px 0px #BBDEFB,
      0px 14px 10px rgba(13,71,161, 0.1),
      0px 24px 2px rgba(13,71,161, 0.1),
      0px 34px 30px rgba(13,71,161, 0.1)` 
    : `0px 3px 0px #BBDEFB,
      0px 14px 10px rgba(200,200,200, 0.1),
      0px 24px 2px rgba(200,200,200, 0.1),
      0px 34px 30px rgba(200,200,200, 0.1)`


  return (
    <Box
      sx={{
        backgroundColor: '',
        }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid container item 
              justifyContent='flex-start'
              alignItems='flex-start'
               xs={4}>
              <Typography
                color="secondary.main"
                sx={{
                  // backgroundColor: '#333',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  textShadow: logoColors,
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}>
                TACHE
              </Typography>
            </Grid>
            {isAuthenticated ? <UserMenu /> : <UserAuth />}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
