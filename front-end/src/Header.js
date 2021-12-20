/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
import Settings from './Settings'
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'
import LogoutIcon from '@mui/icons-material/Logout';
import { red, grey, amber } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const useStyles = (theme) => ({
  header: {
    height: 75,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: 'white',
    flexShrink: 0,
    minWidth: "600px",
    borderBottom: "1px solid #c1bdbd"
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    color: "black",
    //backgroundColor: "blue",
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  logo: {
    marginRight: "2vw",
    alignItems: "center",
    fontFamily: "Courier",
    //backgroundColor: "red",
    color: "black",
    flexGrow: "1",
    display: "block"
  },
  logoIcon: {
    marginLeft: "2vw",
    width: 80,
    height: 80
  },
  user: {
    display: "inline-flex",
    alignItems: "center",
    //backgroundColor: "green",
    marginRight: "1vw",
    fontSize: 18,
    fontWeight: 500,
    color: grey[700]
  },
  logout: {
    color: red[900],

  }
})



export default function Header({
  drawerToggleListener
}) {
  const [openSettings, setOpenSettings] = useState(false);

  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible, currentUser
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }

  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const onClickSettings = () => {
    setOpenSettings(true);
  };

  return (
    <header css={styles.header}>
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={drawerToggle}
    css={styles.menu}
    >
    <MenuIcon />
    </IconButton>
    <img css={styles.logoIcon} src="/logo_clear.png" alt="LogoClear"/>
    <h1 css={styles.logo}> BeeTalky </h1>
    {
      oauth ?
      <span css={styles.user}>
      <div>
      {oauth.email}
      </div>
      <Gravatar //gravatar image with default parameters override
      email={oauth.email}
      size={50}
      rating="pg"
      default="monsterid"
      className="CustomAvatar-image"
      style={{margin: '10px', borderRadius: '25px'}}
      protocol="https://"
      />
      <Tooltip title="Settings">
      <IconButton
      onClick={onClickSettings}
      size="large"
      sx={{"&:hover": {background: grey[200]}}}>
      <SettingsIcon fontSize="inherit"/>
      </IconButton>
      </Tooltip>
      { currentUser &&
      <Settings
      dialogOpen={openSettings}
      handleCloseDialog={() =>setOpenSettings(false)}/>
      }
      <Tooltip title="Logout">
      <IconButton onClick={onClickLogout}
      size="large"
      css={styles.logout}
      sx={{"&:hover": {background: grey[200]}}}>
      <LogoutIcon fontSize="inherit"/>
      </IconButton>
      </Tooltip>
      </span>
      :
      <span css={styles.user}> new user</span>
    }
    </header>
  );
}
