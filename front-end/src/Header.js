/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        //backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        backgroundColor: amber[500],
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default function Header({
  drawerToggleListener
}) {
  const [openSettings, setOpenSettings] = useState(false);
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }

function valuetext(value) {
  return `${value}°C`;
}
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const onClickSettings = () => {
    setOpenSettings(true);
  };
  const closeSettings = () => {
    setOpenSettings(false);
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
      <Dialog open={openSettings} onClose={closeSettings}>
       <DialogTitle>Account settings</DialogTitle>
       <DialogContent css={{flexDirection: "column", display: "flex"}}>
       <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultUnchecked />}
        label="Night mode"
      />
      <FormControl component="fieldset">
      <FormLabel css={{paddingTop: 20, paddingBottom: 5}} component="legend">Language</FormLabel>
      <RadioGroup
        aria-label="language"
        defaultValue="English"
        name="radio-buttons-group">
        <FormControlLabel value="english" control={<Radio />} label="English" />
        <FormControlLabel value="french" control={<Radio />} label="Français" />
        <FormControlLabel value="chinese" control={<Radio />} label="中文" />
      </RadioGroup>
    </FormControl>
    <Box sx={{ width: 300 }}>
      <FormLabel css={{paddingTop: 20, paddingBottom: 5}} component="legend">Font size</FormLabel>
     <Slider
       aria-label="Fontsize"
       defaultValue={18}
       getAriaValueText={valuetext}
       valueLabelDisplay="auto"
       step={2}
       marks
       min={10}
       max={30}
     />
   </Box>
       </DialogContent>
       <DialogActions>
         <Button sx={{
           borderColor:red[800],
           color:red[800],
           "&:hover": {borderColor: grey[200], background: grey[200] }}}
          variant="outlined"
          onClick={closeSettings}>Cancel changes</Button>
       </DialogActions>
     </Dialog>
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