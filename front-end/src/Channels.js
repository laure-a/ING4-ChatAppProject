
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
import React from 'react';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from '@mui/material/colors';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

const styles = {
  root: {
    '& a': {
      //padding: '0.2rem 0rem',
      whiteSpace: 'nowrap',
    }
  },
  titleContainer: {
    display: "flex",
  },
  title: {
    color: "black",
    paddingLeft: "15px",
    display: "block"
  },
  addButton: {
    marginLeft: 60,
    color: red[800],
  },
}

export default function Channels() {
  // const [open, setOpen] = React.useState(false)
  //
  // const handleClickOpen = () => {
  //   setOpen(true);
  // }
  //
  // const handleClose = () => {
  //   setOpen(false);
  // }
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
      <Link to="/channels" component={RouterLink}>
      <Button startIcon={<HomeIcon />} variant="contained"
      sx={{
        paddingLeft: 2,
        flexDirection: "line",
        display: "flex",
        justifyContent: "left",
        width: 199,
        height: 40,
        color: "black",
        borderRadius: 0,
        backgroundColor: "#ffae00",
        "&:hover": {
          background: "#e09808"}
      }}
      > Welcome
      </Button>
      </Link>
      <div css={styles.titleContainer}>
      <h3 css={styles.title}> Channels </h3>
      <IconButton
      //onClick={handleClickOpen}>
      //sx={{"&:hover": {background: "black"}}}
      css={styles.addButton}>
      <AddCircleIcon fontSize="inherit"/>
      </IconButton>
      </div>
      </li>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel_button}>
          <Button
          sx={{
            paddingLeft: 2,
            flexDirection: "line",
            display: "flex",
            justifyContent: "left",
            width: 199,
            height: 40,
            color: "black",
            borderRadius: 0,
            backgroundColor: "#ffae00",
            "&:hover": {
              background: "#e09808"}
          }}
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
