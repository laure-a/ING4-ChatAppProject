
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'
import LogoutIcon from '@mui/icons-material/Logout';
import { red, grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
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
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible,
    currentUser, setCurrentUser
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const handleCloseSelection = () => {
    setOpenSelection(false);
  };

  let choice

  const onSubmitAvatar = async () => {
    const {data:nUser} =await axios.put(
      `http://localhost:3001/users/${currentUser.id}`
      , {
        id: currentUser.id,
        email: currentUser.email,
        avatchoice: choice,
      }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    setCurrentUser(nUser)
  }
  const [openSelection, setOpenSelection] = useState(false);
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
      <img css={styles.logoIcon} src="/logo_clear.png" alt="LogoClear" />
      <h1 css={styles.logo}> BeeTalky </h1>
      {
        oauth ?
          <span css={styles.user}>
            <div>
              {oauth.email}
            </div>
            {currentUser.avatchoice === 0 ? (
              <Gravatar //gravatar image with default parameters override
                email={oauth.email}
                size={50}
                rating="pg"
                default="monsterid"
                className="CustomAvatar-image"
                style={{ margin: '10px', borderRadius: '25px' }}
                protocol="https://"
              />
            ) : currentUser.avatchoice === 1 ? (
              <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
            ) : currentUser.avatchoice === 2 ? (
              <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
            ) : currentUser.avatchoice === 3 ? (
              <img src="https://img.icons8.com/color/48/000000/spyro.png" />
            ) : currentUser.avatchoice === 4 ? (
              <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
            ) : (
              <img src="https://img.icons8.com/ios/50/000000/question-mark.png" />
            )
            }
            <Button
              onClick={() => {
                setOpenSelection(true);
              }}  >
              Choose Avatar
            </Button>
            <Dialog open={openSelection} onClose={handleCloseSelection} fullWidth={true} maxWidth='md'>
              <DialogTitle>Choose an avatar among the selection</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseSelection}>Cancel</Button>
                <Button
                  onClick={() => {
                    choice = 0;
                    onSubmitAvatar();
                    setOpenSelection(false);
                  }}
                >Default Gravatar</Button>
                <Gravatar //gravatar image with default parameters override
                  email={oauth.email}
                  size={50}
                  rating="pg"
                  default="monsterid"
                  className="CustomAvatar-image"
                  style={{ margin: '10px', borderRadius: '25px' }}
                  protocol="https://"
                />
                <Button
                  onClick={() => {
                    choice = 1;
                    onSubmitAvatar();
                    setOpenSelection(false);
                  }}
                >Avatar 1</Button>
                <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
                <Button
                  onClick={() => {
                    choice = 2;
                    onSubmitAvatar();
                    setOpenSelection(false);
                  }}
                >Avatar 2</Button>
                <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
                <Button
                  onClick={() => {
                    choice = 3;
                    onSubmitAvatar();
                    setOpenSelection(false);
                  }}
                >Avatar 3</Button>
                <img src="https://img.icons8.com/color/48/000000/spyro.png" />
                <Button
                  onClick={() => {
                    choice = 4;
                    onSubmitAvatar();
                    setOpenSelection(false);
                  }}
                >Avatar 4</Button>
                <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
              </DialogActions>
            </Dialog>
            <IconButton onClick={onClickLogout}
              size="large"
              css={styles.logout}
              sx={{ "&:hover": { background: grey[200] } }}>
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </span>

          :
          <span css={styles.user}> new user</span>
      }
    </header>
  );
}
