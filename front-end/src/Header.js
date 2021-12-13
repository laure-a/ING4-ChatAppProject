
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
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: '#DDDBDB',
    flexShrink: 0
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
  logo: {
    marginLeft: "6vw",
    alignItems: "center",
    fontFamily: "Courier",
    //backgroundColor: "red",
    color: "black",
    flexGrow: "1",
    display: "block"
  },
  user: {
    display: "inline-flex",
    alignItems: "center",
    //backgroundColor: "green",
    marginRight: "6vw",
    fontSize: 18,
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
        <Link onClick={onClickLogout}>logout</Link>
      </span>
      :
      <span css={styles.user}> new user</span> 
      }
    </header>
  );
}
