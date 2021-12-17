
/** @jsxImportSource @emotion/react */
import {useContext, useEffect, useState} from 'react';
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
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
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
    alignItems: "center",
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
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const [channelName, setChannelName] = useState('')
  const [open, setOpen] = useState(false);
  const [usersListDb, setUsersListDb] = useState([]);
  const [inputValueUser, setInputValueUser] = useState([]);

  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: users} = await axios.get('http://localhost:3001/users', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        let tempo = []
        let already = false
        for (let i=0; i<users.length; i++){
          if(users[i].username!==oauth.email)
          tempo.push({label: users[i].username})}
        setUsersListDb(tempo)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [])

  const onSubmit = async () => {
    const tempo = inputValueUser.map(username => {
     return username.label
   } )
    const tempoUsersList= [oauth.email].concat(tempo)
    const {data: channel} = await axios.post(
      `http://localhost:3001/channels`
    , {
      name: channelName,
      owner: `${oauth.email}`,
      usersList: tempoUsersList,
    },{
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }})
    addChannel(channel)
    setChannelName('')
    handleClose()
  }
  const handleChange = (e) => {
    setChannelName(e.target.value)
  }
  const addChannel = (channel) => {
    setChannels([...channels, channel])
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
          ,
          params: {
            connectedUser: `${oauth.email}` }})
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
      <div>
      <IconButton
      onClick={handleClickOpen}
      css={styles.addButton}>
      <AddCircleIcon fontSize="inherit"/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Create a new channel</DialogTitle>
       <DialogContent>
         <DialogContentText>
           To create a new channel, please enter its name and members.
           Then send or cancel the form by clicking on the
           corresponding button.
         </DialogContentText>
         <TextField
           margin="dense"
           id="name"
           label="Channel name"
           fullWidth
           variant="standard"
           required
           value={channelName}
           onChange={handleChange}
         />
         <Stack spacing={3} sx={{ width: 400 }}>
         <Autocomplete
         multiple
         fullWidth
         disablePortal
         id="combo-box-users"
         options={usersListDb}
         renderInput={(params) => <TextField {...params}
         variant="standard"
         label="User emails"/>}
         value={inputValueUser}
         onChange={(event, inputValueUser) => {
           setInputValueUser(inputValueUser);
         }}
         />
          </Stack>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
         <Button onClick={onSubmit}>Send</Button>
       </DialogActions>
     </Dialog>
     </div>
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
              console.log(channel.usersList);
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
