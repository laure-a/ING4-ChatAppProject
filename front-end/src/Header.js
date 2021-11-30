
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
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
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
    Header
    {
      oauth ?
      <span>
      {oauth.email}
      <Link onClick={onClickLogout}>logout</Link>
      <Gravatar //gravatar image with default parameters override
      email={oauth.email}
      size={50}
      rating="pg"
      default="monsterid"
      className="CustomAvatar-image"
      style={{margin: '0px'}}
      protocol="https://"
      />
      </span>
      :
      <span>new user</span>
    }

    </header>
  );
}
