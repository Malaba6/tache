import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  Grid, IconButton, Avatar, Menu, MenuItem,
  ListItem, ListItemIcon, ListItemText, Collapse, Select,
} from '@mui/material'
import {
  Logout, AccountCircleRounded, Login,
  AppRegistration
} from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import TranslateIcon from '@mui/icons-material/Translate';

import { useAuth } from 'context/useAuth'
import useLang from 'hooks/useLang'
import { getLangageObj } from 'utils/index'
import { languages, menus } from 'utils/constants'

function UserMenu() {
  const { t } = useTranslation()
  const [lang, setLang] = useLang()
  const [ {isAuthenticated, user } ] = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const [selectedLang, setSelectedLang] = useState(getLangageObj(lang))

  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleChange = (e) => {
    const {
      target: { value },
    } = e
    setSelectedLang(value)
    setLang(value.code)
  }

  return <Grid
    container item xs={8}
    justifyContent='flex-end'>
    <Select
      value={selectedLang}
      onChange={handleChange}
      IconComponent={TranslateIcon}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <img
            alt="English"
            src='https://flagcdn.com/w20/gb.png'
            style={{ marginRight: 8 }}
          />
        }
        return <img
          alt={selected.label}
          src={selected.src}
          style={{ marginRight: 8 }}
        />
      }}
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{
        p: 0,
        mr: 1
      }}
      >
      {languages.map(l => {
        const isSelected = l.code === selectedLang.code

        return <MenuItem
          selected
          sx={{
            background: isSelected && '#444',
            ':hover': {
              background: '#666'
            }
            
          }}
          key={l.id} value={l}>
            <ListItem>
              <ListItemIcon>
                <img
                  loading='lazy'
                  alt={`${l.label}`}
                  src={l.src}
                  srcSet={l.srcSet}
                />
              </ListItemIcon>
              <ListItemText>{l.label}</ListItemText>
            </ListItem>
        </MenuItem>
      })}
    </Select>
    <IconButton
      aria-controls='user-menu'
      onClick={handleClick}
      sx={{
        // m: 1
      }}
      aria-haspopup='true'>
      {isAuthenticated
        ? <Avatar>{`${user.firstname}${user.lastname}`}</Avatar>
        : <AccountCircleRounded fontSize='large' />}
    </IconButton>
    <Collapse in={Boolean(anchorEl)} timeout={2000}>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        onClick={handleClose}
        open={Boolean(anchorEl)}
      >
        {menus.map(({ label, href }) => {
          switch(label) {
            case 'Logout':
              return isAuthenticated && <MenuItem key={label} button onClick={() => null}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>{t('logout')}</ListItemText>
              </MenuItem>
            case 'Signup':
              return !isAuthenticated && <MenuItem key={label} button href={href}>
                <ListItemIcon>
                  <AppRegistration />
                </ListItemIcon>
                <ListItemText>{t('signup')}</ListItemText>
              </MenuItem>
            case 'Login':
              return !isAuthenticated && <MenuItem key={label} button href={href}>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText>{t('login')}</ListItemText>
              </MenuItem>
            default:
              return null
          }
        })}
      </Menu>
    </Collapse>
  </Grid>
}
  

export default function ButtonAppBar() {
  const theme = useTheme()
  // const [ {isAuthenticated }, dispatch] = useAuth()
  const [lang] = useLang()

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
            <UserMenu lang={lang} />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
