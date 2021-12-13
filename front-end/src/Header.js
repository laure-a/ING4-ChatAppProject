
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'

const useStyles = (theme) => ({
  header: {
    height: 75,
    padding: theme.spacing(1),
    backgroundColor: '#DDDBDB',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    backgroundColor: "blue",
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  nameLogo: {
    position: "absolute",
    left: "8vw",
    alignItems: "center",
    width: 300,
    backgroundColor: "green",
    height: 60,
  },
  logo: {
    fontFamily: "Courier",
    backgroundColor: "red",
    color: "black"
  },
  username: {
    backgroundColor: "green",
    position: "absolute",
    top: 40,
    right: "6vw",
    fontSize: 16,
    fontWeight: 500,
    color: "#730202"
  },
  userGravatar: {
    alignItems: "center",
    backgroundColor: "blue",
    position: "absolute",
    top: 20,
    right: "6vw",
    fontSize: 16,
    fontWeight: 500,
    color: "#730202"
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
      <div css={styles.nameLogo}>
        <h1 css={styles.logo}> BeeTalky </h1>
      </div>

      {
      oauth ?
      <span css={styles.userGravatar}>
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
        <Link onClick={onClickLogout}>logout</Link>
      </span>
      :
      <span css={styles.username}> new user</span> //à changer
      }
    </header>
  );
}
