
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = (theme) => ({
  header: {
    height: 75,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: 'white',
    flexShrink: 0,
    minWidth: "600px"
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
    color: "#730202"
  },
  logout: {
    color: 'black',

  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
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
      <IconButton onClick={onClickLogout}
      size="large"
      css={styles.logout}
      sx={{"&:hover": {background: "#cccccc"}}}>
      <LogoutIcon fontSize="inherit"/>
      </IconButton>
      </span>
      :
      <span css={styles.user}> new user</span>
    }
    </header>
  );
}
